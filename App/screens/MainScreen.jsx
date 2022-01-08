import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { FlatList } from "react-native";
import { getCountries, getExchangeRates } from "../services/currencyLayer";

export default function MainScreen() {
  const [amount, setAmount] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const renderDropDownItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.value}</Text>
      </View>
    );
  };

  const renderListItem = (item) => {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.heading}>{item.key}</Text>
          <Text style={styles.subHeading}>{item.value}</Text>
        </View>
        <View>
          <Text style={styles.currency}>{item.rate}</Text>
        </View>
      </View>
    );
  };

  const updateExchangeRate = (currentAmount, curr) => {
    getExchangeRates(countryList, selectedCountry, setLoading)
      .then((data) => {
        const val = curr.map((item) => {
          const rate = data[selectedCountry + item.key];
          if (rate) {
            const v = rate * currentAmount;
            item.rate = v;
          }
          return item;
        });
        setCurrencies(val);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(async () => {
    try {
      const data = await getCountries(setLoading);
      const res = [];
      for (const [key, value] of Object.entries(data)) {
        res.push({ key, value, rate: 0 });
      }
      const countryCodes = res.map((item) => item.key);
      setCountryList(countryCodes);
      setExchangeRates(res);
      setCurrencies(res);
    } catch (error) {}
  }, []);

  useEffect(async () => {
    if (amount >= 0 && selectedCountry != null) {
      clearTimeout(timerId);
      const _timerId = setTimeout(updateExchangeRate, 500, amount, currencies);
      setTimerId(_timerId);
    }
  }, [amount, selectedCountry]);

  return (
    <View>
      <Input
        inputContainerStyle={styles.inputContainer}
        value={amount}
        underlineColorAndroid="transparent"
        keyboardType="numeric"
        placeholder={"0"}
        focusable
        autoFocus
        errorStyle={{ display: "none" }}
        leftIcon={
          <Icon
            name="currency-usd"
            color="green"
            style={{ paddingHorizontal: 10 }}
            type={"material-community"}
          />
        }
        onChangeText={(text) => {
          if (text == "") setAmount(0);
          setAmount(text);
        }}
      />
      <Dropdown
        style={
          countryList.length == 0 ? styles.dropdownDisable : styles.dropdown
        }
        containerStyle={styles.shadow}
        data={currencies}
        search
        disable={currencies.length == 0}
        searchPlaceholder="Search"
        labelField="value"
        valueField="key"
        label="Dropdown"
        placeholder="Select Country"
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item.key);
        }}
        renderLeftIcon={() => (
          <Icon
            name="flag"
            color="skyblue"
            style={{ paddingHorizontal: 10 }}
            type={"fontawesome5"}
          />
        )}
        renderItem={(item) => renderDropDownItem(item)}
        textError="Error"
      />
      {currencies.length != 0 && (
        <FlatList
          keyExtractor={(item, index) => item.key}
          contentContainerStyle={styles.listContainer}
          maxToRenderPerBatch={50}
          style={{ marginLeft: 10, marginEnd: 10 }}
          extraData={amount}
          data={currencies}
          renderItem={({ item }) => renderListItem(item)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderColor: "#ffffff",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  inputContainer: {
    borderColor: "#ffffff",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  dropdownDisable: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 18,
    padding: 8,
  },
  listItem: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    flex: 1,
    fontSize: 18,
  },
  subHeading: {
    flex: 1,
    fontSize: 14,
    color: "gray",
  },
  currency: {
    color: "green",
    fontSize: 18,
  },
});
