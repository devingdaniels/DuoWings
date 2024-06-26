import NavigationBar from "../../components/NavigationBar";
import DeckMenuPanel from "../../components/DeckMenuPanel";

interface Deck {
  id: number;
  title: string;
  description: string;
}

const tempDecks: Deck[] = [
  {
    id: 1,
    title: "1",
    description: "This is the first deck",
  },
  {
    id: 2,
    title: "ish",
    description: "This is the second deck",
  },
  {
    id: 3,
    title: "Longerstill",
    description: "This is the third deck",
  },
];

function TutorPage() {
  return (
    <>
      <NavigationBar />
      <div className="tutor-page-container">
        <DeckMenuPanel decks={tempDecks} />
      </div>
    </>
  );
}

export default TutorPage;
