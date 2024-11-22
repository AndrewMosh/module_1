import map from "@assets/svg/map.svg";
import "./Map.scss";

export const Map = () => {
    return (
        <section className="map">
            <h2 className="map__title">You can use our services anywhere in the world</h2>
            <h3 className="map__subtitle">Withdraw and transfer money online through our application</h3>
            <img className="map__image" src={map} alt="map" />
        </section>
    );
};
