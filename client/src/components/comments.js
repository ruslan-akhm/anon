import React from 'react';
import './Like.css';
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from ".../firebase-config";


export function comments(props){

    const [Id, setId] = useState('');
    const [Likes, setLikes] = useState('');
	const [Text, setText] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [userId, setUserId] = useState('');

    const comments = collection(db, 'comments');
    const createComment = async () => {
		await addDoc(comments, {
			Id,
            Likes,
            Text,
            companyId, 
            userId
		}).  then((docRef) => {
            alert("Data Successfully Submitted");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        useEffect(() => {
			fetchComments();
		  }, [])

		const [Comments,setComments]=useState([])

		const fetchComments=async()=>{
			const response=db.collection('Comments');
			const data=await response.get();	
			data.docs.forEach(item=>{
				setComments([...Comments,item.data()])
			   })
		}

}


}

