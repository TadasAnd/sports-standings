import CompetitionCard from "./components/CompetitionCard";
import { SportsProvider, useSports } from "./context";

function AppContent() {
  const { state, selectors } = useSports();
  const { competitions } = state;

  return (
    <div className="flex gap-8 flex-col lg:flex-row items-center justify-center p-4 lg:p-8 max-w-screen-xl mx-auto pb-20">
      {competitions.map((competition) => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
          matches={selectors.getMatchesByCompetition(competition.id)}
          teams={selectors.getTeamsByCompetition(competition.id)}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <SportsProvider>
      <AppContent />
    </SportsProvider>
  );
}

export default App;
