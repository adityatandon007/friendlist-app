import React from "react";
import styles from "../styles/main.scss";

export default class FriendListItem extends React.Component {
  constructor (props) {
    super(props);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  renderActionSection () {
    return (
      <div className={styles["card-actions"]}>
        <button className={styles["action-btn"]} onClick={this.toggleFavourite}>
          {this.props.isFavourite ? <i className="fa fa-star" aria-hidden="true"></i> : <i className="fa fa-star-o" aria-hidden="true"></i> }
        </button>
        <button className={styles["action-btn"]} onClick={this.deleteFriend}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  renderFriend () {
    const { friend } = this.props;
    return (
      <div className={styles["card-info"]}>
        <div className={styles["card-title"]}>{friend}</div>
        <div className={styles["card-subtitle"]}>xx friends in common</div>
      </div>
        
    );
  }

  render () {
    return (
      <li className={styles["list-group-item"]}>
        {this.renderFriend()}
        {this.renderActionSection()}
      </li>
    )
  }

  toggleFavourite () {
      this.props.toggleFavourite(this.props.id);
  }

  deleteFriend () {
      this.props.deleteFriend(this.props.id);
  }
}