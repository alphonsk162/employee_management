from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning({
        "event": "http_exception",
        "path": request.url.path,
        "status_code": exc.status_code,
        "detail": exc.detail
    })
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "message": exc.detail}
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning({
        "event": "validation_error",
        "path": request.url.path,
        "errors": exc.errors()
    })
    return JSONResponse(
        status_code=422,
        content={"status": "error", "message": "Invalid input data", "details": exc.errors()}
    )

async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    logger.error({
        "event": "db_error",
        "path": request.url.path,
        "error": str(exc)
    })
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "Database operation failed"}
    )

async def generic_exception_handler(request: Request, exc: Exception):
    logger.error({
        "event": "unexpected_error",
        "path": request.url.path,
        "error": str(exc)
    })
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "An unexpected error occurred"}
    )
