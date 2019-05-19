import React from "react";
import styles from "../styles/main.scss"

export default class FriendInput extends React.Component {
  constructor (props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles["group"]}>      
          <input type="text" ref="friendInput" placeholder="Type the name of a friend" required />
          <span className={styles["highlight"]}></span>
          <span className={styles["bar"]}></span>
        </div>
      </form>
    );
  }
  onSubmit (e) {
    e.preventDefault();
    this.props.addFriend(this.refs.friendInput.value);
    this.refs.friendInput.value = "";
  }
}