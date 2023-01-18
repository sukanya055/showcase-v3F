import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import Form from './Form';
import './Chat.css'
import UserChat from './UserChat';
const Chat = () => {
    const [formOpen, setFormOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)

    const ref = useRef(null)
    useOutsideAlerter(ref)
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setFormOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    return (
        <div ref={ref} className='relative'>
            <div>
                <Avatar
                    formOpen={formOpen}
                    setFormOpen={setFormOpen}
                />
            </div>
            {
                formOpen &&
                <Form
                    visible={user === null || chat === null}
                    setUser={user => setUser(user)}
                    setChat={chat => setChat(chat)}
                />

            }
           
        </div>
    );
};

export default Chat;