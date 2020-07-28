import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

// Component that displays messages
const Message = ({ user, date, message, classes}) => {
  return(
    <div className={`msg-container ${classes}`}>
      <span className="username">{user}</span>
      <span className="date">{date}</span>
      <span className="message">{message}</span>
    </div>
  );
};
Message.propTypes = {
  user: PropTypes.string.isRequired,
  date: PropTypes.string,
  message: PropTypes.string.isRequired,
  classes: PropTypes.string
};

export default Message;

// HOC for Message that passes in username to user prop
export const OwnMessage = ({ user, date, message, status=''}) => {
  const name = useSelector(state => state.connection.username);

  return <Message user={name} date={date} message={message} classes={`own ${status}`} />
};


export const MessageFactory = ({id, user, date, message, status=''}) => {
  switch (user) {
    case 'own':
      return <OwnMessage key={id} user={user} date={date} message={message} status={status} />;
    case 'server':
      return <Message key={id} user={user} date={date} message={message} classes="server" />;
    default:
      return <Message key={id} user={user} date={date} message={message} />;
  }
}
