import React, { useEffect, useState } from 'react';
import { Modal, NativeModules, StatusBarIOS } from 'react-native'
const { StatusBarManager } = NativeModules
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
	ScrollView,
	Platform,
	TouchableHighlight,
	TouchableWithoutFeedback,
} from 'react-native';
import { Card } from 'react-native-elements';
import CardsContainer from './src/CardsContainer';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export default App = () => {
	const [data, setData] = useState([]);
	const [searchData, setsearchData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [filteredDataBackup, setFilteredDataBackup] = useState([]);
	const [filterModalAppear, setFilterModalAppear] = useState(false);
	const [uniqueStatus, setUniqueStatus] = useState([]);
	useEffect(() => {
		fetch('https://run.mocky.io/v3/82f1d43e-2176-4a34-820e-2e0aa4566b5c')
			.then((response) => response.json())
			.then(function (json) {
				setData(json);
				setsearchData(json);
				var uniq = ["Clear Filter"];
				json.forEach(element => {
					uniq.push(element.status);
				});
				uniq = findUniq(uniq);
				setUniqueStatus(uniq);
			})
			.catch((error) => console.error(error));
	},
		[]);

	function findUniq(a) {
		var seen = {};
		return a.filter(function (item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}

	filterSelected = index => {
		filterData = data
		if (index == 0) {
			setFilteredData([]);
			setFilteredDataBackup([]);
			filterClicked()
			return;
		}
		filterData = data.filter(l => {
			return l.status.match(uniqueStatus[index]);
		});
		setFilteredDataBackup(filterData);
		setFilteredData(filterData);
		filterClicked()
	}

	filterClicked = () => {
		setFilterModalAppear(!filterModalAppear);
	}

	searchFirstName = (name) => {
		searchedData = data
		name = name.trim().toLowerCase();
		if (filteredData.length != 0) {
			searchedData = filteredDataBackup.filter(l => {
				return l.title.toLowerCase().match(name);
			});
			setFilteredData(searchedData);
		} else {
			searchedData = data.filter(l => {
				return l.title.toLowerCase().match(name);
			});
			setsearchData(searchedData);
		}
	}
	renderFilterCard = item => {
		return (
			<View>
				<Card style={styles.cardShadow}
					borderRadius={7}
					key={item.id}>

				</Card>
			</View>
		);
	}
	renderCard = item => {
		return (
			<View style={styles.cardShadow}>
				<Card style={styles.cardShadow}
					borderRadius={7}
					key={item.id}
				>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={styles.circle}>
							<Text style={{ fontSize: 20, color: "white" }}>{item.title.toString().charAt(0)}</Text>
						</View>
						<View style={{ flex: 1, flexDirection: "column", marginLeft: 10, marginTop: 3, backgroundColor: "white" }}>
							<Text numberOfLines={1} style={{ width: "70%", fontWeight: '500', fontSize: 15 }}>{item.title}</Text>
							<View style={{ marginLeft: 8, justifyContent: "center", position: 'absolute', right: 0, alignItems: "center", width: 70, height: 25, borderRadius: 44 / 2, backgroundColor: item.status.toString().toLowerCase() != 'mauv' ? item.status.toString().toLowerCase() != 'fuscia' ? item.status.toString().toLowerCase() : 'red' : 'purple' }}>
								<Text style={{ fontSize: 11 }}>{item.status}</Text>
							</View>
							<Text numberOfLines={1} style={{ fontSize: 11, marginTop: 4 }}>{item.subtitle}</Text>
						</View>
					</View>
					<View style={{ flex: 1, alignContent: "center", marginTop: 10, height: 0.1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: 'lightgray', borderStyle: 'dotted', zIndex: 0 }} />
					<View style={{ flex: 1, flexDirection: "row", marginTop: 10, alignContent: "flex-start", alignItems: "center" }}>
						<Icon
							name='calendar'
							size={15}
							color='gray'
						/>
						<View style={{ flex: 1, flexDirection: "row" }}>
							<Text style={{ fontSize: 13, marginLeft: 10, color: "darkgray" }}>Created:</Text>
							<Text style={{ fontSize: 13, marginLeft: 10 }}>{item.created}</Text>
						</View>
					</View>
					<View style={{ flex: 1, alignContent: "center", marginTop: 10, height: 0.1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: 'lightgray', borderStyle: 'dotted', zIndex: 0 }} />
					<View style={{ flex: 1, flexDirection: "row", marginTop: 10, alignContent: "flex-start", alignItems: "center" }}>
						<Icon
							name='list-ul'
							size={15}
							color='gray'
						/>
						<Text style={{ fontSize: 13, marginLeft: 10 }}>{item.short_desc}</Text>

					</View>

					<View style={{ flex: 1, flexDirection: "row", marginTop: 10, alignContent: "flex-start" }}>

						<Icon
							name='building-o'
							size={16}
							color='gray'
							style={{ marginLeft: 1 }}
						/>
						<Text style={{ fontSize: 13, marginLeft: 10 }}>{item.long_desc}</Text>

					</View>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
						<Icon name="chevron-down"></Icon>
					</View>
				</Card>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.navigationBar}>
				<View style={{ flex: 1, flexDirection: "row", marginBottom: 12, justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>
					<Text style={{ fontSize: 25, marginLeft: 10, marginRight: 30, textAlign: "left", color: "white" }}>Assigned to Me</Text>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
						<Icon name='refresh' color="white" size={22} style={{ marginLeft: 50 }} />
						<Icon name='map-marker' color="white" size={22} />
					</View>
				</View>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.toolbar}>
					<View style={styles.searchBar}>
						<Icon name='search' color="gray" size={15} style={{ marginRight: 8 }} />
						<TextInput
							onChangeText={(firstName) => searchFirstName(firstName)} //update state onChange
							focus={true} //initial focus on this TextInput
							style={{ margin: 1, flex: 1 }}
							placeholder="Search Task" />
					</View>
					{/*<Button style= {{marginLeft: 8}} title="Siddhant"/>*/}
					<TouchableHighlight
						onPress={filterClicked}
						style={styles.btnClickContain}
					>
						<View
							style={styles.btnContainer}
						>
							<Text style={styles.btnText}>Filter</Text>
							<Icon
								name='filter'
								size={15}
								color='white'
							/>
						</View>
					</TouchableHighlight>
				</View>
				<ScrollView>
					<CardsContainer
						data={filteredData.length != 0 ? filteredData : searchData}
						renderCard={this.renderCard}
					/>
				</ScrollView>
			</View>
			<>
				{filterModalAppear ?
					<Modal transparent animationType={'none'}>
						<TouchableWithoutFeedback onPress={filterClicked}>
							<SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#00000020' }}>
								<View style={{ height: "45%", backgroundColor: "#fff", marginHorizontal: 20 }}>
									<View style={{ backgroundColor: "lightgray" }}>
										<Text style={{
											fontSize: 16,
											color: '#34495e',
											padding: 13,
										}}>CHOOSE OPTION FROM BELOW</Text>
									</View>
									<View style={{ flex: 1 }}>
										<ScrollView>
											<View onStartShouldSetResponder={() => true} style={{ marginTop: 12, marginHorizontal: 15 }}>
												{uniqueStatus.map((prop, key) => {
													return (
														<>
															<TouchableWithoutFeedback key={key} style={{ flex: 1, flexDirection: "row" }} onPress={() => filterSelected(key)}>
																<><View style={{ flexDirection: "row",width: "100%", alignContent: "center" ,justifyContent: "space-evenly"}}>
																	<View style= {{width: "98%"}}>
																		<Text style={{fontSize: 12}}>{prop}</Text>
																	</View>
																	<Icon name="chevron-right" size={12} color="gray" style={{}}/>
																</View>
																</>
															</TouchableWithoutFeedback>

															<View style={{ flex: 1, alignContent: "center", marginVertical: 10, height: 0.1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: 'lightgray', borderStyle: 'dotted', zIndex: 0 }} />
														</>
													);
												})}
											</View>
										</ScrollView>
									</View>
								</View>
							</SafeAreaView>
						</TouchableWithoutFeedback>
					</Modal>
					: <></>}
			</>
		</View>
	);
}
const styles = StyleSheet.create({
	circle: {
		justifyContent: "center",
		alignItems: "center",
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "darkorange"
	},
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: '#f5f5f5',
		marginTop: STATUSBAR_HEIGHT,
		justifyContent: "center",
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	toolbar: {
		marginTop: 10,
		height: 40,
		flexDirection: "row",
		marginHorizontal: 15,
	},
	searchBar: {
		alignItems: "center",
		flex: 1,
		height: "100%",
		flexDirection: "row",
		padding: 10,
		borderWidth: 0.3,
		borderRadius: 5,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 10,
	},
	navigationBar: {
		backgroundColor: "darkorange",
		paddingTop: STATUSBAR_HEIGHT,
		marginBottom: 5,
		height: 70,
		width: "100%"
	},
	cardShadow: {
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 10,
	},
	btnClickContain: {
		flexDirection: 'row',
		backgroundColor: 'darkorange',
		borderRadius: 5,
		marginLeft: 10,
		padding: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 10,
	},
	btnContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		alignContent: "center",
		borderRadius: 10,
	},
	btnText: {
		fontSize: 14,
		marginRight: 5,
		color: 'white',
	},
	modalContainer: {
		flex: 1, justifyContent: "center", alignItems: "center", height: 50
	},

});