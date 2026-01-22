import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
  },
  subText: {
    marginTop: 4,
    color: "#666",
  },
  logoutBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    // backgroundColor: "#ff4d4d",
    alignItems: "center",
    justifyContent: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardWrapper: {
    flex: 1,
  },
  cardTitle: {
    color: "#666",
    fontSize: 14,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSub: {
    color: "#666",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 14,
    marginBottom: 10,
  },
  transactionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  transactionDate: {
    marginTop: 4,
    color: "#888",
  },
  transactionAmount: {
    fontWeight: "700",
    fontSize: 16,
  },
});


export {
    styles
}