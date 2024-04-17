import { NavLink } from "react-router-dom";
import { BsStack } from "react-icons/bs";

interface Deck {
  id: number;
  title: string;
  description: string;
}

interface DeckMenuPanelProps {
  decks: Deck[];
}

const MenuPanel: React.FC<DeckMenuPanelProps> = ({ decks }) => {
  return (
    <div className="menu-panel-container">
      {decks.map((deck: Deck) => {
        return (
          <div className="menu-item-wrapper" key={deck.id}>
            <NavLink
              to={`/tutor/chat/${deck.id}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div className="menu-panel-item">
                <BsStack color="green" size={25} />
                <h4 className="item-title">{deck.title}</h4>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default MenuPanel;
