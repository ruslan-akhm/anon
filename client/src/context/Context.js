import { useState, createContext, useEffect, useRef } from "react";

export const Context = createContext();

const dummyData = [
	{
		id: 3,
		title: "AC is too cold!",
		text: "Has anyone noticed how cold the AC is set up on the third floor? It's blowing a freezing cold air!",
		likes: 3,
		comments: 2,
		date: "1 day ago",
		hashtags: ["discomfort", "rationaleActionNeeded"],
		category: "Issues and Concerns",
	},
	{
		id: 2,
		title: "Promotion???",
		text: "I've been with the company for couple years now. I have been working hard, but I was never spoken to about a possible promotion. I see company just hires upper managers, when they could promote people who already contributed a lot of their time and energy into doing the work. I do not want to believe this is because I am a minority, but why else? This is unfair.",
		likes: 6,
		comments: 4,
		date: "3 days ago",
		hashtags: ["unfair", "racism"],
		category: "Issues and Concerns",
	},
	{
		id: 1,
		title: "When is the next company event?",
		text: "Hey team, when is our next event gonna be? Last thing we had was over 6 month ago. I would love to meet everybody on some cool activity. Laser tag or Axe throwing anyone?",
		likes: 11,
		comments: 1,
		date: "7 days ago",
		hashtags: ["events"],
		category: "General Topic",
	},
];

const dummyComs = [
	{
		id: 7,
		postId: 1,
		text: "I’d down to throw some axes with y’all",
		date: "Just now",
		userId: 3,
	},
	{
		id: 6,
		postId: 3,
		text: "Agreed! I feel like I need to wear a parka and snow pants every time I walk by!",
		date: "2 min ago",
		userId: 1,
	},
	{
		id: 5,
		postId: 3,
		text: "My desk is RIGHT NEXT to a vent on the third floor, and I had to bring in a space heater from home to feel my hands while typing. The company really needs to fix this!!",
		date: "12 min ago",
		userId: 4,
	},
	{
		id: 4,
		postId: 2,
		text: "Hey! HR is here! We can definitely look into more management training options for the company. Thanks so much for the suggestion!",
		date: "3 hours ago",
		userId: 2,
	},
	{
		id: 3,
		postId: 2,
		text: "I feel the same way!! What’s up with all these outside hires for management?! If the company doesn’t think it’s people are good enough for promotions then maybe they should actually invest in training them!!!",
		date: "7 hours ago",
		userId: 1,
	},
	{
		id: 2,
		postId: 2,
		text: "In my culture manager decides when and if to talk about promotions. I did not think it was appropriate for me to bring up with them, but will ask them about it and see what happens. Thanks for the suggestion!",
		date: "7 hours ago",
		userId: 3,
	},
	{
		id: 1,
		postId: 2,
		text: "Have you spoken to your manager about this? If they know what you want to achieve in your career, they can watch out for opportunities and create a plan for you to advance.",
		date: "1 day ago",
		userId: 4,
	},
];

const dummyUserData = [
	{
		id: 1,
		username: "uij088",
	},
	{
		id: 2,
		username: "9io08s",
	},
	{
		id: 3,
		username: "zy6re4",
	},
	{
		id: 4,
		username: "mp8ts4",
	},
	{
		id: 5,
		username: "h4ckt0",
	},
];

const Provider = ({ children }) => {
	const [dummyPosts, setDummyPosts] = useState(dummyData);
	const [dummyComments, setDummyComments] = useState(dummyComs);
	const [dummyUsers, setDummyUsers] = useState(dummyUserData);
	const [user, setUser] = useState({
		id: 5,
		username: "h4ckt0",
	});
	return (
		<Context.Provider
			value={{
				dummyPosts,
				setDummyPosts,
				dummyComments,
				setDummyComments,
				dummyUsers,
				setDummyUsers,
				user,
				setUser,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
