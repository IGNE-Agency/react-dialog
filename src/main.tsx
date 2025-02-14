import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	useDialog,
} from "../";
import DialogClose from "../lib/components/dialog-close/dialog-close";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("App could not mount. Root not found.");
}

const root = createRoot(rootElement);

const App = () => {
	const removeDialog = useDialog();
	const submitDialog = useDialog<boolean>();
	const [posts, setPosts] = useState(
		[...new Array(5).keys()].map((i) => ({
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
		removeDialog.close();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;

		const consent = await submitDialog.open();
		if (!consent) {
			return;
		}

		const data = Object.fromEntries(new FormData(form).entries()) as {
			title: string;
			content: string;
		};

		setPosts((posts) =>
			posts.concat({
				...data,
				id: posts.length.toString(),
			}),
		);

		form.reset();
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
							removeDialog.open();
						}}
					>
						Delete post {post.id}
					</button>
				</div>
			))}
			<hr />
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<h2>New post</h2>
				<label
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<span>Title</span>
					<input type="text" name="title" />
				</label>
				<label
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<span>Content</span>
					<textarea name="content" rows={5} />
				</label>
				<button type="submit">Create post</button>
			</form>
			<Dialog dialog={removeDialog} root={rootElement} ignoreBackdropClick>
				<div
					style={{
						background: "white",
						borderRadius: "1rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						padding: "1rem",
					}}
				>
					<DialogHeader>
						<h1>Removing {postIdToBeDeleted}</h1>
					</DialogHeader>
					<DialogContent>
						Removing a post breaks other website's links to your post, cannot be
						undone.
					</DialogContent>
					<DialogFooter>
						<button type="button" onClick={removeDialog.close} autoFocus>
							Don't remove
						</button>
						<button
							type="button"
							onClick={() => {
								if (!postIdToBeDeleted) {
									return;
								}
								removePost(postIdToBeDeleted);
							}}
						>
							I understand, remove post
						</button>
					</DialogFooter>
				</div>
			</Dialog>
			<Dialog dialog={submitDialog} root={rootElement}>
				<div
					style={{
						background: "white",
						borderRadius: "1rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						padding: "1rem",
					}}
				>
					<DialogHeader>
						<h1>Create new post</h1>
						<DialogClose dialog={submitDialog}>X</DialogClose>
					</DialogHeader>
					<DialogContent>
						<p>
							By creating a new post, you agree to our{" "}
							<a href="/">Terms of Service</a> and{" "}
							<a href="/">Community Guidelines</a>.
						</p>
						<p>
							Please make sure you didn't write any no-no words in your post.
						</p>
					</DialogContent>
					<DialogFooter>
						<button
							type="button"
							onClick={() => {
								submitDialog.close(false);
							}}
							autoFocus
						>
							Don't post
						</button>
						<button
							type="button"
							onClick={() => {
								submitDialog.close(true);
							}}
						>
							I understand, create post
						</button>
					</DialogFooter>
				</div>
			</Dialog>
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
