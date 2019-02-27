import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import BingMapsImageryProvider from "cesium/Source/Scene/BingMapsImageryProvider";
import CesiumTerrainProvider from "cesium/Source/Core/CesiumTerrainProvider";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import Cesium from "cesium";
import io from "socket.io-client";
import { addPoint } from "../actions";

const BING_MAPS_URL = "//dev.virtualearth.net";
const BING_MAPS_KEY = "ApDPY15x9lCXO5Hw89M1G5Q84_BlKalPbjor8GvKGj2UAnVtzlT5UT-zrylU1e48";
// const STK_TERRAIN_URL = "//assets.agi.com/stk-terrain/world";

class Globe extends React.Component {

	componentDidMount() {
		Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDdmMDg5MS00MjQwLTRlMDUtOTRiZi0yZmVkNDFjMTFmMDQiLCJpZCI6ODAxNywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MTA1MjI5N30.TewDjS5FlMse_gZAWyWhQ8ngnHRu_HgTCBvHl8ECS9g";
		const imageryProvider = new BingMapsImageryProvider({
            url : BING_MAPS_URL,
            key : BING_MAPS_KEY,
        });
		const terrainProvider = new CesiumTerrainProvider({
			url: Cesium.IonResource.fromAssetId(1)
		});
		this.viewer = new Viewer(this.cesiumContainer, {
            animation : false,
            baseLayerPicker : false,
            fullscreenButton : false,
            geocoder : false,
            homeButton : false,
            infoBox : false,
            sceneModePicker : false,
            selectionIndicator : true,
            timeline : false,
            navigationHelpButton : false,
            scene3DOnly : true,
            imageryProvider,
            terrainProvider,
        });

		const socket = io.connect("127.0.0.1:5000");
		socket.emit('points');
		socket.on('points', (event) => {
			this.props.addPoint(event);
		});
	}

	shouldComponentUpdate() {
		const { points } = this.props;
		this.viewer.entities.removeAll();
		points.forEach(point => this.addPointOnGlobe(point));
		return true
	}

	componentWillUnmount() {
        if(this.viewer) {
            this.viewer.destroy();
        }
    }

    addPointOnGlobe(point) {
		this.viewer.entities.add({
			name: point.name,
			position: Cartesian3.fromDegrees(point.longitude, point.latitude, point.height),
			point: { pixelSize: point.size }
		});
    }

	render() {
		const containerStyle = {
            width: '100%',
            height: '100%',
            display : "flex",
            alignItems : "stretch",
        };

        const widgetStyle = {
            flexGrow : 2
        };

        return (
            <div className="cesiumGlobeWrapper" style={containerStyle}>
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}>
                </div>
            </div>
        );
    }
}

Globe.propTypes = {

};

function mapStateToProps(state) {
	return {
		points: state.globe.points
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addPoint: point => dispatch(addPoint(point)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Globe);