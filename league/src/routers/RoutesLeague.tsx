import {Routes, Route} from "react-router-dom";
import {Home} from '../pages/Home';
import {MagicalTeam} from '../pages/MagicalTeam';
import {PlayerManagement} from '../pages/PlayerManagement';

export function RoutesLeague() {
  return (
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magical-team" element={<MagicalTeam />} />
          <Route path="/player-management" element={<PlayerManagement />} />
      </Routes>
  );
}