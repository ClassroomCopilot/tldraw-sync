export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'
export type LogCategory = 'binding' | 'translation' | 'position' | 'array' | 'shape' | 'general' | 'system'

interface LogConfig {
    enabled: boolean        // Master switch to turn logging on/off
    level: LogLevel        // Current log level
    categories: LogCategory[]  // Which categories to show
}

const LOG_LEVELS: Record<LogLevel, number> = {
    error: 0,  // Always shown if enabled
    warn: 1,   // Shows warns and errors
    info: 2,   // Shows info, warns, and errors
    debug: 3,  // Shows debug and above
    trace: 4   // Shows everything
}

class DebugLogger {
    private config: LogConfig = {
        enabled: process.env.NODE_ENV === 'development',
        level: 'info',
        categories: ['system', 'binding', 'translation']
    }

    setConfig(config: Partial<LogConfig>) {
        this.config = { ...this.config, ...config }
    }

    private shouldLog(level: LogLevel, category: LogCategory): boolean {
        return (
            this.config.enabled &&
            LOG_LEVELS[level] <= LOG_LEVELS[this.config.level] &&
            this.config.categories.includes(category)
        )
    }

    log(level: LogLevel, category: LogCategory, message: string, data?: any) {
        if (!this.shouldLog(level, category)) return

        const timestamp = new Date().toISOString()
        const prefix = `[${timestamp}] [${level.toUpperCase()}] [${category}]`

        if (data) {
            console.log(`${prefix} ${message}`, data)
        } else {
            console.log(`${prefix} ${message}`)
        }
    }

    // Convenience methods
    error(category: LogCategory, message: string, data?: any) {
        this.log('error', category, message, data)
    }

    warn(category: LogCategory, message: string, data?: any) {
        this.log('warn', category, message, data)
    }

    info(category: LogCategory, message: string, data?: any) {
        this.log('info', category, message, data)
    }

    debug(category: LogCategory, message: string, data?: any) {
        this.log('debug', category, message, data)
    }

    trace(category: LogCategory, message: string, data?: any) {
        this.log('trace', category, message, data)
    }

    setQuietMode() {
        this.setConfig({
            enabled: true,
            level: 'error',
            categories: ['system']
        })
    }

    setNormalMode() {
        this.setConfig({
            enabled: true,
            level: 'info',
            categories: ['system', 'binding', 'translation']
        })
    }

    setDebugMode() {
        this.setConfig({
            enabled: true,
            level: 'debug',
            categories: ['binding', 'translation', 'position', 'array', 'shape']
        })
    }

    setVerboseMode() {
        this.setConfig({
            enabled: true,
            level: 'trace',
            categories: ['binding', 'translation', 'position', 'array', 'shape', 'general', 'system']
        })
    }
}

export const logger = new DebugLogger()

// Example usage:
// logger.setConfig({ level: 'debug', categories: ['binding', 'translation'] })
