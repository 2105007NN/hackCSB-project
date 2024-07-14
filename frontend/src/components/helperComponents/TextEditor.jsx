import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor() {
	const editorRef = useRef(null);
	const [isJournalSubmitted, setIsJournalSubmitted] = useState(false);
	const sendJournalContent = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: editorRef.current.getContent(),
					access_token: JSON.parse(
						localStorage.getItem("access_token")
					),
				}),
			};
			fetch("http://localhost:3000/tools/journal", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					console.log("Data : ", data);
					setIsJournalSubmitted(true);
				})
				.catch((err) => {
					console.log("ERROR IN SENDING JOURNAL CONTENT : ", err);
				});
		}
	};

	if (!isJournalSubmitted) {
		return (
			<>
				<div className="relative w-full h-full">
					<Editor
						apiKey="ehgoznosko5sxgqixp1ukxpj1fhdkrxvhgq0jjycrt2tjbtv"
						onInit={(_evt, editor) => (editorRef.current = editor)}
						initialValue="<p>This is the initial content of the editor.</p>"
						init={{
							height: 500,
							menubar: false,
							plugins: [
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"code",
								"help",
								"wordcount",
							],
							toolbar:
								"undo redo | blocks | " +
								"bold italic forecolor | alignleft aligncenter " +
								"alignright alignjustify | bullist numlist outdent indent | " +
								"removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
					/>

					<button
						className="absolute bottom-5 right-0 mb-5 mr-5 
						btn btn-primary bg-gray-800 text-white"
						onClick={sendJournalContent}
					>
						Log Journal
					</button>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="w-1/2 h-full mb-8">
					<h1 className="text-3xl text-purple-300 text-center">Your Journal has been logged</h1>

					<br/>
					<br/>


					<h2 className="text-secondary text-2xl text-center text-wrap">
						Remember, every entry is a step towards healing. Proud of you for
						taking this moment for yourself.
					</h2>

				</div>
			</>
		);
	}
}
