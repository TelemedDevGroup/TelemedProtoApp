import React, {Component} from 'react';
import { Loader, Dimmer, Segment, Image } from 'semantic-ui-react'



class PageNotFound extends Component {

  render() {
    return (
      <React.Fragment>
        <Segment>
          <Dimmer active inverted>
            <Loader>Not Found</Loader>
          </Dimmer>

          <Image src='/images/wireframe/short-paragraph.png' />
        </Segment>
      </React.Fragment>
    );
  }

}

export default PageNotFound;
