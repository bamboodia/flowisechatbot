"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [streamedData, setStreamedData] = useState("");

	const query = async (data) => {
		const response = await fetch(
			"https://flowisechatbot.onrender.com/api/v1/prediction/9b297a69-7837-4e83-b104-949358061c9b",
			{
				headers: { Authorization: "Bearer t+LhuXKKRdfG9YCk86nvb1IIFPxPfqdnq3HEW//nfsc=" },
				method: "POST",
				body: data
			}
		);
		const result = await response.json();
		return result;
	};

	const handleChatSubmit = async (e) => {
		e.preventDefault();
		setStreamedData("");
		const formData = new FormData(e.currentTarget);
		const question = { question: formData.get("prompt") };
		const response = await query(question);
		console.log(response);
		const reader = response.body.getReader();

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}
			const text = new TextDecoder().decode(value);
			setStreamedData((prevData) => prevData + text);
		}
	};

	const handleClearChat = () => {
		setStreamedData("");
	};
	return (
		<main className="flex max-w-6xl mx-auto items-center justify-center p-24">
			<div className="flex flex-col gap-12">
				<h1 className="text-gray-200 font-extrabold text-6xl text-center">bamGPT 👌</h1>
				<form onSubmit={handleChatSubmit}>
					<input
						className="py-2 px-4 rounded-md bg-gray-600 text-white w-full"
						type="text"
						placeholder="Ask me something"
						name="prompt"
						required
					/>
					<div className="flex justify-center gap-4 py-4">
						<button
							type="submit"
							className="py-2 px-4 rounded-md text-sm bg-lime-700 text-white hover:opacity-80 transition-opacity">
							Send Chat
						</button>
						<button
							type="button"
							onClick={handleClearChat}
							className="py-2 px-4 rounded-md text-sm bg-red-700 text-white hover:opacity-80 transition-opacity">
							Clear Chat
						</button>
					</div>
				</form>
				{streamedData && (
					<div>
						<h3 className="text-2xl text-gray-400">AI Assistant</h3>
						<p className="text-gray-200 rounded-md bg-gray-700 p-4">{streamedData}</p>
					</div>
				)}
			</div>
		</main>
	);
}
