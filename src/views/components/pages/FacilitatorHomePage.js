import React from "react";
import { View, Alert } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import NameCard from "../cards/NameCard";
import TracedYouthList from "../list/TracedYouthList";
import YouthTraced from "../cards/YouthTraced";
import { useYouthStore } from "zustand/useYouthStore";
import * as SQLite from "expo-sqlite";
import { alerts } from "utils";
import { useFocusEffect } from "@react-navigation/native";
import { youthRepository } from "repository";
import { useAuth } from "context/authContext";
import EventModal from "../modals/EventModal";

function FacilitatorHomePage(props) {
  const token = useAuth().token;
  let db = SQLite.openDatabase("youths.db");
  const youths = useYouthStore((state) => state.youths);
  const setYouths = useYouthStore((state) => state.setYouths);
  const { navigation } = props;
  const [isShowModal, setIsShowModal] = React.useState(false);

  const createTable = React.useCallback(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS youths (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DEFAULT CURRENT_TIMESTAMP, sync DEFAULT 0, name TEXT, details TEXT)",
        null,
        (txObj, result) => null,
        (txObj, error) => null
      );
    });
  }, []);

  const fetchYouths = React.useCallback(async () => {
    db.transaction((tx) => {
      return tx.executeSql(
        "SELECT * FROM youths ORDER BY id DESC LIMIT 5",
        null,
        (txObj, resultSet) => {
          setYouths(resultSet.rows._array);
        },
        (txObj, error) => {
          console.debug(error);
        }
      );
    });
  }, []);

  const handleEditYouth = React.useCallback(async (id, isEditable) => {
    try {
      db.transaction((tx) => {
        return tx.executeSql(
          "SELECT * FROM youths WHERE id = ?",
          [id],
          (txObj, resultSet) => {
            const details = JSON.parse(resultSet.rows._array[0]["details"]);
            if (isEditable) {
              navigation.navigate("EditYouth", {
                selectedYouth: details,
                youthid: id,
                isEditable: isEditable,
              });
            } else {
              navigation.navigate("YouthDetails", {
                selectedYouth: details,
                youthid: id,
                isEditable: isEditable,
              });
            }
          },
          (txObj, error) => {
            console.debug(error);
          }
        );
      });
    } catch (error) {
      console.debug(error);
    }
  }, []);

  const handleDeleteYouth = React.useCallback(async (id) => {
    try {
      const action = await alertPrompt();
      if (action === true) {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM youths WHERE id = ?",
            [id],
            (txObj, _) => {
              alerts.success({ message: "Youth record was deleted" });
              fetchYouths();
            },
            (txObj, _) => {
              alerts.error({ message: "SQL Error" });
            }
          );
        });
        fetchYouths();
      }
    } catch (error) {
      console.debug(error);
    }
  }, []);

  const handleUploadYouth = async (data) => {
    setIsShowModal(true);
    try {
      const result = await youthRepository.upload(token.token, data.details);
      if (result !== undefined) {
        if (!result.error) {
          db.transaction((tx) => {
            return tx.executeSql(
              "UPDATE youths SET sync = '1' where id = ?",
              [data.id],
              (txObj, result) => {
                fetchYouths();
                alerts.success({ message: result.message });
              },
              (txObj, error) => alerts.error({ message: error.toString() })
            );
          });
        } else {
          alerts.error({ message: result.message });
        }
      }
    } catch (error) {
      console.debug(error);
    } finally {
      setIsShowModal(false);
    }
  };

  const bulkUploadYouth = React.useCallback(async () => {
    try {
      setIsShowModal(true);
      let success = 0;
      if (youths.length > 0) {
        youths.map(async (data) => {
          if (data.sync === 0) {
            let result = await youthRepository.upload(
              token.token,
              data.details
            );
            if (!result.error) {
              db.transaction((tx) => {
                return tx.executeSql(
                  "UPDATE youths SET sync = '1' where id = ?",
                  [data.id],
                  (txObj, result) => null,
                  (txObj, error) => null
                );
              });
              success = success + 1;
            }
          }
        });
        if (success > 0) {
          alerts.success({
            message: `${success} ${
              success < 1 ? "record" : "records"
            } uploaded`,
          });
          fetchYouths();
        } else {
          alerts.info({
            message: `${success} ${
              success < 1 ? "record" : "records"
            } uploaded`,
          });
        }
      } else {
        alerts.info({ message: "No youth records to upload" });
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    } finally {
      setIsShowModal(false);
    }
  }, []);

  const alertPrompt = async (
    title = "Delete record?",
    msg = "Deleting a record"
  ) => {
    return new Promise((resolve) => {
      return Alert.alert(title, msg, [
        {
          text: "Proceed",
          onPress: () => resolve(true),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => resolve(false),
        },
      ]);
    });
  };

  const clearYouths = React.useCallback(async () => {
    try {
      const action = await alertPrompt(
        "Deleting records?",
        "Clear All Records"
      );
      if (action === true) {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM youths",
            null,
            (txObj, resultSet) => {
              alerts.success({ message: "All records are cleared" });
            },
            (txObj, error) => {
              alerts.error({ message: "SQL Error" });
            }
          );
        });
        setYouths([]);
      }
    } catch (error) {
      console.debug(error);
    }
  }, []);

  const searchRecords = React.useCallback(async (text) => {
    db.transaction((tx) => {
      return tx.executeSql(
        "SELECT * FROM youths WHERE name LIKE ? ORDER BY id DESC LIMIT 5",
        [`%${text}%`],
        (txObj, resultSet) => {
          setYouths(resultSet.rows._array);
        },
        (txObj, error) => {
          console.debug(error);
        }
      );
    });
  }, []);

  React.useEffect(() => {
    createTable();
    fetchYouths();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchYouths();
    }, [])
  );

  const options = {
    fetchYouths: () => fetchYouths(),
    clearYouths: () => clearYouths(),
    alertPrompt: () => alertPrompt(),
    handleEditYouth: (id, isEditable = true) => handleEditYouth(id, isEditable),
    handleDeleteYouth: (id) => handleDeleteYouth(id),
    handleUploadYouth: (data) => handleUploadYouth(data),
    bulkUploadYouth: () => bulkUploadYouth(),
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <NameCard />
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <YouthTraced options={options} />
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <TextInput
        onChangeText={(text) => searchRecords(text)}
        placeholder="Search Name"
        mode="outlined"
        style={{ marginHorizontal: 10 }}
      />
      <Divider style={{ marginBottom: 5, marginTop: 15 }} />
      <TracedYouthList {...props} options={options} />
      <EventModal
        isShow={isShowModal}
        setIsShow={() => setIsShowModal(false)}
      />
    </View>
  );
}

export default FacilitatorHomePage;
