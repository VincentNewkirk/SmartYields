import App from '../ui/App.jsx';
import Test from '../ui/TestComponent.jsx';


FlowRouter.route('/test', {
  name: 'test',
  action(){
    ReactLayout.render( App, {yield: <Test />});
  }
});