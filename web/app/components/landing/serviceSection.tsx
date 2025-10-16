import { Card, CardContent } from "@/components/ui/card";
import { Pipette as Pipe, Zap, Hammer, Wrench, Paintbrush, Car, Drill, Lightbulb, ShieldIcon, Clipboard} from "lucide-react";
import { Button } from "../ui/button";

export function ServiceGrid(){
    const services = [
        { 
            id: 1,
            bgColor: 'bg-orange-400',
            icon: Zap, 
            name: "FixNow", 
            description: "Instant Handymen Access",
            keyFeature: "Smart Match",
            toolUsed: "Geo-location and category-based filtering",
            benefit: "Reduces wait times by instantly connecting users to available fixers within a 3km radius"
          }, { 
            id: 2,
            bgColor: 'bg-green-400',
            icon: ShieldIcon, 
            name: "FixProtect", 
            description: "7-day worry-free repair guarantee",
            keyFeature: "Maintenance Reminders",
            toolUsed: "In-app notifications and calendar sync",
            benefit: "Notifies users when it's time for routine checks on appliances, thus reducing chances of sudden breakouts"
          },    { 
            id: 3,
            bgColor: 'bg-blue-100',
            icon: Lightbulb, 
            name: "FixTips", 
            description: "Expert repair guides made simple",
            keyFeature: "Quick DIY Guides",
            toolUsed: "Short illustrated articles and videos within app",
            benefit: "Smart DIY saves time and money while reducing the number of unnecessary fixer callouts"
          },    { 
            id: 4,
            bgColor: "bg-purple-100",
            icon: Clipboard, 
            name: "FixList", 
            description: "Searchable Directory of Verified Fixers",
            keyFeature: "Verified Fixer Listings",
            toolUsed: "Filterable directory with user ratings and specialties",
            benefit: "A searchable directory of verified local fixers, complete with ratings, service areas, and specialties."
          },
      
      
      
        
      ]
    return(
        <section className="py-20 dark:bg-slate-900">
            <div className="container mx-auto px-4 ">
                <div className="text-center mb-16 ">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
                    <p className="text-xl text-muted-foreground">Proffesional fixers for every need</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 max-w-6xl mx-auto">
                {services.map((service) => (
                    <Card key={service.id} className={`hover:shadow-lg transition-shadow ${service.bgColor}`}>
                        <CardContent className="p-6 text-center">
                            <service.icon className="w-6 h-6 text-orange-600  mx-auto mb-4 dark:text-orange-400" />
                            <h3 className="font-bold mb-2">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                            {service.keyFeature && (
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-xs font-semibold text-primary mb-1">
                                Key Feature: {service.keyFeature}
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                Tool Used: {service.toolUsed}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                {service.benefit}
                                </p>
                            </div>
                            )}
              </CardContent>
                    </Card> 
                ))}
            </div>
        </section>
    )
}