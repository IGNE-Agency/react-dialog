import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	useDialog,
} from "../";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("App could not mount. Root not found.");
}

const root = createRoot(rootElement);

const App = () => {
	const dialog = useDialog();
	const [posts, setPosts] = useState(
		[...new Array(10).keys()].map((i) => ({
			id: i.toString(),
			title: "Lorem Ipsum",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam deleniti voluptatem optio expedita aliquam veritatis repudiandae, saepe corporis id, rerum voluptas quisquam illum veniam odio tenetur vitae consequatur, voluptate voluptatibus.",
		})),
	);
	const [postIdToBeDeleted, setPostIdToBeDeleted] = useState<string>();

	const removePost = (id: string) => {
		setPosts((posts) =>
			posts.toSpliced(
				posts.findIndex((post) => post.id === id),
				1,
			),
		);
		setPostIdToBeDeleted(undefined);
		dialog.close();
	};

	return (
		<>
			<h1>Posts</h1>
			{posts.map((post) => (
				<div key={post.id}>
					<h2>
						{post.title} {post.id}
					</h2>
					<p>{post.content}</p>
					<button
						type="button"
						onClick={() => {
							setPostIdToBeDeleted(post.id);
							dialog.open();
						}}
					>
						Delete post {post.id}
					</button>
				</div>
			))}
			<Dialog dialog={dialog} root={rootElement}>
				<DialogHeader>Removing {postIdToBeDeleted}</DialogHeader>
				<DialogContent>
					Removing a post breaks other website's links to your post, cannot be
					undone.
				</DialogContent>
				<DialogFooter>
					<button type="button" onClick={dialog.close}>
						Don't remove
					</button>
					<button
						type="button"
						onClick={() => {
							removePost(postIdToBeDeleted);
						}}
					>
						I understand, remove post.
					</button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
