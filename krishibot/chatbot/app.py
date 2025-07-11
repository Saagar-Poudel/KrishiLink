from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

import streamlit as st
import os
from dotenv import load_dotenv

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

##Langsmith tracing
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")

## Prompt Template

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant that provides information about agriculture and farming."),
        ("user", "Question:{question}"),
    ]
)

## streamlit framework

st.title("KrishiBot - Agriculture Chatbot")
input_text = st.text_input("Ask a question about agriculture or farming:")

#openAI LLM
llm = ChatOpenAI(model="gpt-4o")
output_parser = StrOutputParser()
chain=prompt | llm | output_parser

if input_text:
    st.write(chain.invoke({"question": input_text}))