import { DefaultColorStyle, RecordProps, T } from 'tldraw'
import { IMicrophoneShape, ITranscriptionTextShape } from './microphone-shape-types'

// Validation for our custom card shape's props, using one of tldraw's default styles
export const microphoneShapeProps: RecordProps<IMicrophoneShape> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
	isOn: T.boolean,
	buttonX: T.number,
	buttonY: T.number,
	buttonWidth: T.number,
	buttonHeight: T.number
}

export const transcriptionTextShapeProps: RecordProps<ITranscriptionTextShape> = {
	text: T.string,
	w: T.number,
	h: T.number,
	sentenceId: T.string,
	isComplete: T.boolean,
}