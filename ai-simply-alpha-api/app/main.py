from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore

app = FastAPI(title="Simply Alpha API")

# Allow frontend communication (CORS)
origins = [
    "http://localhost:3000",
    "https://simply-alpha.azurestaticapps.net"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Simply Alpha API is running successfully!"}
