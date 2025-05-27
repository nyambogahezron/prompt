import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Prompt from '../models/Prompt';
import PromptTemplate from '../models/PromptTemplate';
import GeminiService from '../services/geminiService';
import CustomError from '../errors/customError';

// Types
interface AuthRequest extends Request {
	user?: {
		userId: string;
		name: string;
		role: string;
	};
}

/**
 * Controller for managing prompt templates
 */
export const getAllTemplates = async (req: Request, res: Response) => {
	const templates = await PromptTemplate.find({}).sort({ name: 1 });
	res.status(StatusCodes.OK).json({ templates, count: templates.length });
};

export const getTemplateById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const template = await PromptTemplate.findById(id);

	if (!template) {
		throw new CustomError({
			message: `No template found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	res.status(StatusCodes.OK).json({ template });
};

export const createTemplate = async (req: AuthRequest, res: Response) => {
	// Add user ID to request body
	req.body.createdBy = req.user?.userId;
	req.body.isDefault = false; // User-created templates aren't default

	const template = await PromptTemplate.create(req.body);
	res.status(StatusCodes.CREATED).json({ template });
};

export const updateTemplate = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { name, description, template, category } = req.body;

	// Find the template
	const promptTemplate = await PromptTemplate.findById(id);

	if (!promptTemplate) {
		throw new CustomError({
			message: `No template found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Check permissions - only allow updates to templates created by the user
	// or if user is an admin
	if (promptTemplate.isDefault && req.user?.role !== 'admin') {
		throw new CustomError({
			message: 'Not authorized to update default templates',
			statusCode: StatusCodes.FORBIDDEN,
		});
	}

	if (
		promptTemplate.createdBy &&
		promptTemplate.createdBy.toString() !== req.user?.userId &&
		req.user?.role !== 'admin'
	) {
		throw new CustomError({
			message: 'Not authorized to update this template',
			statusCode: StatusCodes.FORBIDDEN,
		});
	}

	// Update the template
	promptTemplate.name = name || promptTemplate.name;
	promptTemplate.description = description || promptTemplate.description;
	promptTemplate.template = template || promptTemplate.template;
	promptTemplate.category = category || promptTemplate.category;

	await promptTemplate.save();
	res.status(StatusCodes.OK).json({ template: promptTemplate });
};

export const deleteTemplate = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const template = await PromptTemplate.findById(id);

	if (!template) {
		throw new CustomError({
			message: `No template found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Check permissions - only allow deletion of templates created by the user
	// or if user is an admin
	if (template.isDefault && req.user?.role !== 'admin') {
		throw new CustomError({
			message: 'Not authorized to delete default templates',
			statusCode: StatusCodes.FORBIDDEN,
		});
	}

	if (
		template.createdBy &&
		template.createdBy.toString() !== req.user?.userId &&
		req.user?.role !== 'admin'
	) {
		throw new CustomError({
			message: 'Not authorized to delete this template',
			statusCode: StatusCodes.FORBIDDEN,
		});
	}

	await template.deleteOne();
	res.status(StatusCodes.OK).json({ msg: 'Template removed' });
};

/**
 * Controller for generating and managing prompts
 */
export const generatePrompt = async (req: AuthRequest, res: Response) => {
	const { title, userInstructions, templateId, category, tags } = req.body;

	// Validate input
	if (!title || !userInstructions || !templateId || !category) {
		throw new CustomError({
			message:
				'Please provide title, user instructions, template ID, and category',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	// Find the template
	const promptTemplate = await PromptTemplate.findById(templateId);

	if (!promptTemplate) {
		throw new CustomError({
			message: `No template found with id: ${templateId}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	try {
		// Generate the prompt using Gemini
		const geminiService = new GeminiService();
		const generatedPrompt = await geminiService.generatePrompt(
			userInstructions,
			promptTemplate.template
		);

		// Create a new prompt record
		const prompt = await Prompt.create({
			title,
			content: promptTemplate.template,
			userInstructions,
			generatedPrompt,
			category,
			tags: tags || [],
			userId: req.user?.userId,
		});

		res.status(StatusCodes.CREATED).json({
			prompt,
			message: 'Prompt generated successfully',
		});
	} catch (error: any) {
		throw new CustomError({
			message: `Failed to generate prompt: ${error.message}`,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		});
	}
};

export const getUserPrompts = async (req: AuthRequest, res: Response) => {
	const prompts = await Prompt.find({ userId: req.user?.userId }).sort({
		createdAt: -1,
	});

	res.status(StatusCodes.OK).json({
		prompts,
		count: prompts.length,
	});
};

export const getPromptById = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	res.status(StatusCodes.OK).json({ prompt });
};

export const updatePrompt = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { title, category, tags } = req.body;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	// Update only allowed fields
	prompt.title = title || prompt.title;
	prompt.category = category || prompt.category;
	prompt.tags = tags || prompt.tags;

	await prompt.save();

	res.status(StatusCodes.OK).json({
		prompt,
		message: 'Prompt updated successfully',
	});
};

export const enhancePrompt = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const { enhancementRequest } = req.body;

	if (!enhancementRequest) {
		throw new CustomError({
			message: 'Please provide enhancement request',
			statusCode: StatusCodes.BAD_REQUEST,
		});
	}

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	try {
		// Enhance the prompt using Gemini
		const geminiService = new GeminiService();
		const enhancedPrompt = await geminiService.enhancePrompt(
			prompt.generatedPrompt,
			enhancementRequest
		);

		// Update the prompt
		prompt.generatedPrompt = enhancedPrompt;
		await prompt.save();

		res.status(StatusCodes.OK).json({
			prompt,
			message: 'Prompt enhanced successfully',
		});
	} catch (error: any) {
		throw new CustomError({
			message: `Failed to enhance prompt: ${error.message}`,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		});
	}
};

export const analyzePrompt = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	try {
		// Analyze the prompt using Gemini
		const geminiService = new GeminiService();
		const analysis = await geminiService.analyzePrompt(prompt.generatedPrompt);

		res.status(StatusCodes.OK).json({
			analysis,
			message: 'Prompt analyzed successfully',
		});
	} catch (error: any) {
		throw new CustomError({
			message: `Failed to analyze prompt: ${error.message}`,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		});
	}
};

export const deletePrompt = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;

	const prompt = await Prompt.findOne({
		_id: id,
		userId: req.user?.userId,
	});

	if (!prompt) {
		throw new CustomError({
			message: `No prompt found with id: ${id}`,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	await prompt.deleteOne();

	res.status(StatusCodes.OK).json({ msg: 'Prompt removed' });
};
