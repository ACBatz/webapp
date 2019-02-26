import React from "react";
import { connect } from "react-redux";
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import BingMapsImageryProvider from "cesium/Source/Scene/BingMapsImageryProvider";
import CesiumTerrainProvider from "cesium/Source/Core/CesiumTerrainProvider";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import Cartographic from "cesium/Source/Core/Cartographic";
import Cesium from "cesium";

const BING_MAPS_URL = "//dev.virtualearth.net";
const BING_MAPS_KEY = "ApDPY15x9lCXO5Hw89M1G5Q84_BlKalPbjor8GvKGj2UAnVtzlT5UT-zrylU1e48";
const STK_TERRAIN_URL = "//assets.agi.com/stk-terrain/world";

class Globe extends React.Component {

	state = {
        viewerLoaded : false,
    };

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

		this.setState({viewerLoaded : true});
	}

	componentWillUnmount() {
        if(this.viewer) {
            this.viewer.destroy();
        }
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

Globe.propTypes = {};

function mapStateToProps(state) {
	return {}
}

export default Globe;