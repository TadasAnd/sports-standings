import CompetitionCard from "./components/CompetitionCard";
import { SportsProvider, useSports } from "./context";

function AppContent() {
  const { state, selectors } = useSports();
  const { competitions } = state;

  return (
    <div className="flex gap-4 flex-col xl:gap-8 lg:flex-row mx-auto items-center justify-center p-1 sm:p-2 lg:p-8 max-w-screen-xl pb-20">
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
