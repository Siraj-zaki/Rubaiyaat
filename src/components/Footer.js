import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <footer class="main-footer mt-3"
            //  style={{position:'absolute',width:'100%',bottom:0}}
            >
                <div class="row ml-0 mr-0">
                    <div class="col-sm-6">
                        <p class="mb-0 pt-1 white">SQCC Platform | Release v3.2.417</p>
                        <p class="mb-0 pt-1 white">Time Zone</p>
                    </div>
                    <div class="col-sm-6">
                        <p class="mb-0 pt-2 white text-right">Page Load: 0.35s</p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
