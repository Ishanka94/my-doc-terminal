

  class ConsoleLogger {
    log;
    warn;
    error;

    constructor(logLevel = 'info') {
      this.error = console.error.bind(console);
      if (logLevel === 'error') {
        this.warn = this.logEmpty;
        this.log = this.logEmpty;
        return;
      }

      this.warn = console.warn.bind(console);
      if (logLevel === 'warn') {
        this.log = this.logEmpty;
        return;
      }

      this.log = console.log.bind(console);
    }

    log(message, ...optionalParams) {
      console.log(message, ...optionalParams);
    }
  
    warn(message, ...optionalParams) {
      console.warn(message, ...optionalParams);
    }
  
    error(message, ...optionalParams) {
      console.error(message, ...optionalParams);
    }

    logEmpty(message, ...optionalParams) {
      // nothing
    }
  }

  export default ConsoleLogger;