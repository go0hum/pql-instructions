import {Routes, Route} from "react-router-dom";
import {Home} from '../pages/Home';
import {MagicalTeam} from '../pages/MagicalTeam';
import {PlayerManagement} from '../pages/PlayerManagement';
import { PlayerManagementAdd } from "../pages/PlayerManagementAdd";

export function RoutesLeague() {
  return (
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magical-team" element={<MagicalTeam />} />
          <Route path="/player-management" element={<PlayerManagement />} />
          <Route path="/magical-team/add" element={<PlayerManagementAdd />} />
      </Routes>
  );
}