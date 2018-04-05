import React, { Component } from 'react'
import { Button, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GridLayout from 'react-grid-layout';
import Popup from "reactjs-popup";

import styles from './styles.scss'


class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
            isLoggedIn: true,
            message: ''
        }

    }

    render() {
        var layout = [
          {i: 'PLACEHODER1', x: 0, y: 0, w: 3, h: 2, minW: 3, maxW: 7},
          {i: 'PLACEHODER2', x: 4, y: 0, w: 3, h: 2, minW: 3, maxW: 7},
          {i: 'PLACEHODER3', x: 8, y: 0, w: 3, h: 2, minW: 3, maxW: 7}
        ];

        if (this.state.isLoggedIn) {
            return(
                <div>
                    <div className="plus-activity-icon">
                        <Link to="/addActivity"><Icon name='plus circle' size='massive'/></Link>

                        
                    </div>
                    <div className="bottom-pannel">
                        <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2000}>
                            <div className="pannel-component" key="PLACEHODER1">PLACEHODER1</div>
                            <div className="pannel-component" key="PLACEHODER2">PLACEHODER2</div>
                            <div className="pannel-component" key="PLACEHODER3">PLACEHODER3</div>
                        </GridLayout>
                    </div>
                </div>

            )
        } else {
            return(
                <div>
                    
                </div>
            )
        }
    }
}

export default Dashboard


// <Popup trigger={<Icon name='plus circle' size='massive'/>} position="center" closeOnDocumentClick>
//                             {close => (
//                               <div className="modal">
//                                 <a className="close" onClick={close}>
//                                   &times;
//                                 </a>
//                                 <div className="header"> Modal Title </div>
//                                 <div className="content">
//                                   {" "}
//                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
//                                   Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
//                                   delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
//                                   <br />
//                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
//                                   commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
//                                   explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
//                                 </div>
//                                 <div className="actions">
//                                   <Popup
//                                     trigger={<button className="button"> Trigger </button>}
//                                     position="top center"
//                                     closeOnDocumentClick
//                                   >
//                                     <span>
//                                       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus
//                                       nemo, maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi
//                                       deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
//                                     </span>
//                                   </Popup>
//                                   <button
//                                     className="button"
//                                     onClick={() => {
//                                       console.log('modal closed ')
//                                       close()
//                                     }}
//                                   >
//                                     close modal
//                                   </button>
//                               </div>
//                               </div>
//                             )}
//                         </Popup>