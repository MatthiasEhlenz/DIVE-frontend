import React, { Component, PropTypes } from 'react';
import styles from './Landing.sass';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logoutUser } from '../../actions/AuthActions'
import { showToast } from '../../actions/UserActions';

import Link from '../Base/Link';
import HomePage from './HomePage';
import { wipeProjectState } from '../../actions/ProjectActions';

import { Position, Toaster, Button, Intent } from '@blueprintjs/core';

import Logo from '../../../assets/DIVE_logo_white.svg?name=Logo';


const betaToaster = Toaster.create({
  className: 'beta-toaster',
  timeout: 2000,
  position: Position.TOP,
})


export class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userOptionsOpen: true,
      opaqueNavbar: false,
      betaToastOpen: true,
    };
  }

  componentWillMount() {
    const { user, push, wipeProjectState, showToast } = this.props;

    if (this.state.betaToastOpen && user.showToast) {
      betaToaster.show({
        message: <span>This instance of DIVE is for the Design LAK 2021 Conference Workshop. To report bugs, please contact <a href="mailto:aneesha.bakharia@gmail.com" target="_blank">aneesha.bakharia@gmail.com</a>.</span>,
        iconName: 'hand-right',
        intent: Intent.WARNING,
        onDismiss: this.closeBetaToast
      });
      showToast();
    }

    // Wipe project on landing page
    wipeProjectState();
  }

  _onClickLogo = () => {
    this.props.push(`/`);
  }

  _getSelectedTab = () => {
    const tabList = ["/projects", "/about"];
    const _validTab = function (tabValue) {
      return tabList.indexOf(tabValue) > -1;
    }

    if ((this.props.routes.length > 2) && _validTab(this.props.routes[2].path)) {
      return this.props.routes[2].path;
    }
    return "";
  }

  openUserOptionsMenu = () => {
    this.setState({ userOptionsOpen: true });
  }

  closeUserOptionsMenu = () => {
    this.setState({ userOptionsOpen: false });
  }

  _handleScroll = (e) => {
    const scrollThreshold = 200;
    this.setState({ opaqueNavbar: (e.target.scrollTop > scrollThreshold) });
  }

  closeBetaToast = () => {
    this.setState({ betaToastOpen: false });
  }

  componentWillUnmount() {
    this.closeBetaToast();
  }

  render() {
    const { user, location } = this.props;
    const onLandingPage = (location.pathname == '/');

    return (
      <DocumentTitle title='DIVE | DIVE: Turn Data into Stories Without Writing Code'>
        <div className={ styles.fillContainer + ' ' + styles.landingPage } onScroll={ this._handleScroll }>
          <div
            className={ styles.fillContainer + ' ' + styles.landingPageContent + ( this.props.children ? ' ' + styles.landingPageProjects : ' ' + styles.landingPageHome) }
          >
          <nav className={ 'pt-navbar pt-dark pt-fixed-top ' + styles.header + ( onLandingPage ? ( this.state.opaqueNavbar ? ' ' + styles.opaque : '') : ' ' + styles.opaque) }>
            <div className="pt-navbar-group pt-align-left">
              <div className={ 'pt-navbar-heading ' + styles.logoContainer } onClick={ this._onClickLogo }>
                <Logo className={ styles.logo } />
                <div className={ styles.logoText }>DIVE</div>
              </div>
              {/*<span className="pt-navbar-divider"></span>
              <Link className="pt-button pt-minimal pt-icon-help" route="/faq">FAQ</Link>*/}
            </div>
            <div className="pt-navbar-group pt-align-right">
              { (user.id && !user.anonymous) &&
                <div className={ styles.rightButtons }>
                  <Link className="pt-button pt-minimal pt-icon-projects" route="/projects">Projects</Link>
                  <span className="pt-navbar-divider"></span>
                  <div className="pt-button pt-minimal pt-icon-log-out" onClick={ this.props.logoutUser }>Log Out of { user.username }</div>
                </div>
              }
              { (user.anonymous || !user.id) &&
                <div className={ styles.rightButtons }>
                  <Link className="pt-button pt-minimal pt-icon-log-in" route="/auth/login">Log In</Link>
                  <Link className="pt-button pt-minimal pt-icon-user" route="/auth/register">Register</Link>
                </div>
              }
            </div>
            </nav>
            <div className={ styles.fillContainer }>
              { this.props.children || <HomePage /> }
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

LandingPage.propTypes = {
  children: PropTypes.node
};

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { showToast, wipeProjectState, push, logoutUser })(LandingPage);
