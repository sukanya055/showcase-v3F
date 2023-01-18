import React, { useEffect, useState } from 'react';

const UserChat = (props) => {
   
    const { formOpen, visible } = props || {}
    const { email } = props?.user || {}
    const [chat, setChat] = useState(false)

    useEffect(() => {

        if (props.visible) {
            setTimeout(() => {
                setChat(true)
            }, 500)
        }

    })

    return (

        <div
            style={{
                zIndex: visible && formOpen ? '100' : '0',
                width: visible && formOpen ? '400px' : '0px',
                height: visible && formOpen ? '500px' : '0px',

            }}
            className={
                `fixed bottom-[150px] right-[20px] w-[${props.visible ? '600px' : '0px'}] h-[${props.visible ? '500px' : '0px'}] bg-white rounded-xl form shadow-xl `
            }
        >
            {/* {
                chat && props.formOpen && <ChatEngineWrapper>
                    <Socket
                        projectID={'e78ee894-2af2-4f88-a44e-3193cd202a81'}
                        userName={email}
                        userSecret={email}
                    />
                    <ChatFeed activeChat={props?.chat?.id} />
                </ChatEngineWrapper>
            } */}
        </div>

    );
};

export default UserChat;