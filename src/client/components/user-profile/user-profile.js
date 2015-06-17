'use strict';
import './user-profile.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../flux/actions/auth-actions';
import UserActions from '../../flux/actions/user-actions';
import AuthStore from '../../flux/stores/auth-store';
import UserStore from '../../flux/stores/user-store';
import ActionTypes from '../../flux/constants/action-types';

export default React.createClass({

  getInitialState: function() {
    return {
      me: null
    };
  },

  componentDidMount: function() {
    UserStore.on(ActionTypes.ME_RES, this.onGetMe);
    var sessionObject = AuthStore.getSessionObject();
    if(sessionObject.emailAddress){
      UserActions.getMe(sessionObject);
    }
  },

  onGetMe: function(){
    var meObject = UserStore.getMe();
    this.setState({
      me:meObject
    });
  },

  render: function() {

    var usersName = '';
    var emailAddress = '';
    var bio = '';

    if(this.state.me){
      if(this.state.me.firstName || this.state.me.lastName) {
        usersName = this.state.me.firstName + ' ' + this.state.me.lastName;
      }

      if(this.state.me.emailAddress){
        emailAddress = this.state.me.emailAddress
      }

      if(this.state.me.bio){
        bio = this.state.me.bio
      }
    }


    return (
      <div className={'user-profile'}>
        <img src="/profile-default.png" />
        <h1>{usersName}</h1>
        <p>{emailAddress}</p>
        <p>{bio}</p>

      </div>
    );

  }
});
