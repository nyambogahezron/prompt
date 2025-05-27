import mongoose, { Document } from 'mongoose';

export interface IPrompt extends Document {
	title: string;
	content: string;
	userInstructions: string;
	generatedPrompt: string;
	category: string;
	tags: string[];
	userId: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const PromptSchema = new mongoose.Schema<IPrompt>(
	{
		title: {
			type: String,
			required: [true, 'Please provide a title'],
			trim: true,
			maxlength: [100, 'Title cannot be more than 100 characters'],
		},
		content: {
			type: String,
			required: [true, 'Please provide prompt content'],
			trim: true,
		},
		userInstructions: {
			type: String,
			required: [true, 'Please provide user instructions'],
			trim: true,
		},
		generatedPrompt: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: [true, 'Please provide a category'],
			enum: [
				'Writing',
				'Academic',
				'Programming',
				'Business',
				'Creative',
				'Marketing',
				'Professional',
				'Personal',
				'Other',
			],
		},
		tags: {
			type: [String],
			default: [],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
