import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor() {
	const editorRef = useRef(null);
	const sendJournalContent = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: JSON.stringify(editorRef.current.getContent()),
				}),
			};
			fetch("http://localhost:3000/tools/journal", requestOptions)
				.then((response) => response.json())
				.then(data => {
					console.log('Data : ', data);
				})
				.catch(err => {
					console.log("ERROR IN SENDING JOURNAL CONTENT : ", err);
				})
				
		}
	};
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
}
