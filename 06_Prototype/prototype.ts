/**
 * Prototype pattern is a creational pattern based on cloning a pre-configured object
 */

interface Clonable {
    Clone(): Clonable
}

class CompanyInfo implements Clonable {
    constructor(public name: string, public addr: string) {}
    Clone(): CompanyInfo {
        return new CompanyInfo(this.name, this.addr);
    }
}

class NameCard implements Clonable {
    companies: CompanyInfo[]
    constructor(public name: string, companyInfo?: CompanyInfo[]) {
        this.companies = companyInfo || [];
    }
    AddCompany(company: CompanyInfo) {
        this.companies.push(company);
        return this;
    }
    SetName(name: string) {
        this.name = name;
        return this;
    }
    GetName() {
        return this.name;
    }
    GetCopmanies() {
        return this.companies;
    }
    Clone(): NameCard {
        const nc = new NameCard(this.name);
        for (let company of this.companies) {
            nc.AddCompany(company.Clone())
        }
        return nc
    }
}


function main() {
    const company = new CompanyInfo("github.org", "Mars");
    const myNameCard = new NameCard("me", [company]);
    const myColleagueCard = myNameCard.Clone().SetName("myColleague");
    console.log(myNameCard.GetName(), myNameCard.GetCopmanies())
    console.log(myColleagueCard.GetName(), myColleagueCard.GetCopmanies())
}