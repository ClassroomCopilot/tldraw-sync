import { T } from 'tldraw'
import { CC_BASE_STYLE_CONSTANTS } from './cc-styles'

// Define the base props interface
export interface CCBaseProps {
  title: string
  w: number
  h: number
  headerColor: string
  isLocked: boolean
}

// Create a constant for the base props validation
const baseShapeProps = {
  title: T.string,
  w: T.number,
  h: T.number,
  headerColor: T.string,
  isLocked: T.boolean,
}

export const ccShapeProps = {
  base: baseShapeProps,

  calendar: {
    ...baseShapeProps,
    date: T.string,
    selectedDate: T.string,
    view: T.string,
    events: T.arrayOf(T.object({
      id: T.string,
      title: T.string,
      start: T.string,
      end: T.string,
      groupId: T.string.optional(),
      extendedProps: T.object({
        subjectClass: T.string,
        color: T.string,
        periodCode: T.string,
        path: T.string.optional()
      })
    })),
  },

  liveTranscription: {
    ...baseShapeProps,
    isRecording: T.boolean,
    segments: T.arrayOf(T.object({
      id: T.string,
      text: T.string,
      completed: T.boolean,
      start: T.string,
      end: T.string,
    })),
    currentSegment: T.object({
      id: T.string,
      text: T.string,
      completed: T.boolean,
      start: T.string,
      end: T.string,
    }).optional(),
    lastProcessedSegment: T.string.optional(),
  },

  settings: {
    ...baseShapeProps,
    userEmail: T.string,
    userRole: T.string,
    isTeacher: T.boolean,
  },

  slideshow: {
    ...baseShapeProps,
    slides: T.arrayOf(T.string),
    currentSlideIndex: T.number,
    slidePattern: T.string,
  },

  slide: {
    ...baseShapeProps,
  },

  slideContent: {
    ...baseShapeProps,
    parentSlideId: T.string,
  },

  'cc-youtube-embed': {
    ...baseShapeProps,
    video_url: T.string,
    transcript: T.arrayOf(T.object({
      start: T.number,
      duration: T.number,
      text: T.string,
    })),
    transcriptVisible: T.boolean,
  },
}

export const ccBindingProps = {
  'cc-slide-layout': {
    placeholder: T.boolean,
    isMovingWithParent: T.boolean.optional(),
  },
  'cc-slide-content-binding': {
    placeholder: T.boolean,
  },
}

export const getDefaultCCBaseProps = () => ({
  title: 'Base Shape',
  w: 100,
  h: 100,
  headerColor: '#3e6589',
  isLocked: false,
})

export const getDefaultCCCalendarProps = () => ({
  ...getDefaultCCBaseProps(),
  date: new Date().toISOString(),
  selectedDate: new Date().toISOString(),
  view: 'timeGridWeek',
  events: [],
})

export const getDefaultCCLiveTranscriptionProps = () => ({
  ...getDefaultCCBaseProps(),
  isRecording: false,
  segments: [],
  currentSegment: undefined,
  lastProcessedSegment: '',
})

export const getDefaultCCSettingsProps = () => ({
  ...getDefaultCCBaseProps(),
  userEmail: '',
  userRole: '',
  isTeacher: false,
})

export function getDefaultCCSlideShowProps() {
  return {
    title: 'Slideshow',
    w: 800,
    h: 600,
    headerColor: '#3e6589',
    isLocked: false,
    slides: [],
    currentSlideIndex: 0,
    slidePattern: 'horizontal',
  }
}

export function getDefaultCCSlideProps() {
  return {
    title: 'Slide',
    w: 800,
    h: 600,
    headerColor: '#3e6589',
    isLocked: false,
  }
}

export function getDefaultCCSlideLayoutBindingProps() {
  return {
    placeholder: false,
    isMovingWithParent: false,
  }
}

export function getDefaultCCYoutubeEmbedProps() {
  const videoHeight = 450
  const totalHeight = videoHeight + CC_BASE_STYLE_CONSTANTS.HEADER.height + (CC_BASE_STYLE_CONSTANTS.CONTENT.padding * 2)
  
  return {
    ...getDefaultCCBaseProps(),
    title: 'YouTube Video',
    w: 800,
    h: totalHeight,
    headerColor: '#ff0000',
    isLocked: false,
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    transcript: [],
    transcriptVisible: false,
  }
}

export function getDefaultCCSlideContentProps() {
  return {
    title: 'Slide Content',
    w: CC_SLIDESHOW_STYLE_CONSTANTS.DEFAULT_SLIDE_WIDTH,
    h: CC_SLIDESHOW_STYLE_CONSTANTS.DEFAULT_SLIDE_HEIGHT - CC_SLIDESHOW_STYLE_CONSTANTS.SLIDE_HEADER_HEIGHT,
    headerColor: 'transparent',
    isLocked: false,
    parentSlideId: '',
  }
}