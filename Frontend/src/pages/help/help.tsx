import SidebarHelp from './sidebar/sidebarhelp';
import HelpRouter from './router/help.router';

const Help = () => {
  return (
    <div className="help-container flex">
      <SidebarHelp />
      <div className="help-content flex-grow p-4">
        <HelpRouter />
      </div>
    </div>
  );
}

export default Help;