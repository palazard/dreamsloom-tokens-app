import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";

actor Token {

  let owner : Principal = Principal.fromText("m3ku4-zhrde-bfwli-xix4y-gybz5-c6bw5-urkyt-grn3u-o36gk-mec6z-dae");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "DLOOM";

  private stable var balancesEntries : [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1){
      balances.put(owner, totalSupply);
    };

  public query func balanceOf (who : Principal) : async Nat {
    let balanceOfWho : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };

    return balanceOfWho;
  };

  public query func getSymbol () : async Text {
    return symbol;
  };

  // public shared(msg) func payOut() : async Text {
  //   Debug.print(debug_show(msg.caller));
  //   if (balances.get(msg.caller) == null){
  //     let amount = 10000;
  //     balances.put(msg.caller, amount);
  //     return "Success";
  //   } else {
  //     return "Aldready Claimed"
  //   }
  // };
  // replaced by (to call transfert):
  public shared(msg) func payOut() : async Text {
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null){
      let amount = 10000;
      let result = await transferTo(msg.caller, amount);
      return result;
    } else {
      return "Aldready Claimed"
    }
  };

  public shared(msg) func transferTo(to: Principal, amount : Nat): async Text {
    let balanceFrom : Nat = await balanceOf(msg.caller);

    if (balanceFrom >= amount) {
      balances.put(msg.caller, balanceFrom - amount);

      let balanceTo : Nat = await balanceOf(to);
      balances.put(to, balanceTo + amount);

      return "Success";

    } else {

      return "Insuficient founds"

    };
  };


  system func preupgrade() {
    balancesEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    let iter = balancesEntries.vals();
    balances := HashMap.fromIter<Principal, Nat>(iter, 1, Principal.equal, Principal.hash);
    if (balances.size() < 1){
      balances.put(owner, totalSupply);
    };
  };

};