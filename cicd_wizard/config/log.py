import logging

from .config import get_settings


log_configuration = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": "logs/wizard.log",
            "formatter": "default",
        }
    },
    "root": {
        "level": get_settings().log_level.upper(),
        "handlers": ["console", "file"],
    },
}


def logger() -> logging.Logger:
    """Get configured logger"""
    logging.config.dictConfig(log_configuration)
    return logging.getLogger(get_settings().app_name)
