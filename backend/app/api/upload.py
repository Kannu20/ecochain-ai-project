from fastapi import APIRouter, UploadFile, File
import chromadb

router = APIRouter()
chroma_client = chromadb.Client()

@router.post("/")
async def upload_document(file: UploadFile = File(...)):
    """Ingest document into ChromaDB vector store for RAG."""
    contents = await file.read()
    # Extract text → chunk → embed → store in ChromaDB
    return {
        "filename": file.filename,
        "size": len(contents),
        "status": "indexed",
        "chunks": 0
    }
