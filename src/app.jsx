import React from "react";
import FriendListItem from "./friend-list-item/friend-list-item";
import FriendInput from "./friend-input/friend-input";
import  styles from './styles/main.scss';

const friends = {
  friendList: [],
  lsKey: "friends",
  populate () {
    this.friendList = this.get();
  },
  get () {
    try {
      return JSON.parse(localStorage.getItem(this.lsKey)) || []
    } 
    catch (e) {}
    return [];
  },
  save () {
    localStorage.setItem(this.lsKey, JSON.stringify(this.friendList));
  },
  toggle (id) {
    let friend = this.friendList[id];
    friend.isFavourite = !friend.isFavourite;
    this.save();
  },
  add (friend) {
    this.friendList.push(friend);
    this.save();
  },
  remove (id) {
    this.friendList.splice(id, 1);
    this.save();
  }
};

friends.populate();

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      friends: friends.friendList,
      currentPage: 1,
      friendsPerPage: 2
    };
    this.addFriend = this.addFriend.bind(this);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render () {
    const { friends, currentPage, friendsPerPage } = this.state;
    const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
    const currentFriends = friends.slice(indexOfFirstFriend, indexOfLastFriend);

    const renderFriends = currentFriends.map((friend, index) => {
      return (
        <FriendListItem
          key={(currentPage-1)*friendsPerPage + index}
          {...friend}
          id={(currentPage-1)*friendsPerPage + index}
          toggleFavourite={this.toggleFavourite}
          deleteFriend={this.deleteFriend}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(friends.length / friendsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={currentPage === number ? (styles["page-item"] + ' ' + styles["active"]) : (styles["page-item"]) }
          key={number}
          id={number}
          onClick={()=>{this.handleClick(number)}}
        >
          <span className={styles["page-link"]}>{number}</span>
        </li>
      );
    });

    return (
      <div className={styles["card"]}>

        <div className={styles["card-header"] + ' ' + styles["bg-dark"] + ' ' + styles["text-white"]}>The FriendList</div>
        <FriendInput
          addFriend={this.addFriend}
        />
        <ul className={styles["list-group"]}>
          {renderFriends}
        </ul>
        <ul className={styles["pagination"]}>
          {renderPageNumbers}
        </ul>
        
      </div>
    );
  }

  addFriend (friend) {
    friend = friend.trim();
    if (!friend) {
      return;
    }
    friends.add({friend, isFavourite: false});
    this.setState({
      friends: this.state.friends
    });
  }

  toggleFavourite (friendId) {
    friends.toggle(friendId);
    this.setState({
      friends: this.state.friends
    });
  }

  deleteFriend (friendId) {
    friends.remove(friendId);
    this.setState({ 
      friends: this.state.friends
    });
  }

  handleClick(number) {
    this.setState({
      currentPage: number
    });
  }
}