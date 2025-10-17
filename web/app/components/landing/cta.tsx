import React from 'react';
import { Button } from '../ui/button';

const CTA: React.FC = () => {
 const ctaDetails = {
    heading: 'Ready to Fix Your Problems?',
    subheading: 'Join thousands of satisfied customers who trust Fixmate for all their repair needs. Get started today and experience hassle-free repairs!'
 }

    return (
        <section id="cta" className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl bg-black dark:bg-slate-800  border border-border">
                    <div className="absolute inset-0 bg-gradient-to-br from-black  via-transparent to-accent/10"></div>
                    
                    <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
                                {ctaDetails.heading}
                            </h2>
                            
                            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                                {ctaDetails.subheading}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button 
                                size="lg" 
                                style={{
                                    backgroundColor: "#FF8C42",
                                    backgroundImage: "linear-gradient(276.68deg, #FFB347 20.18%, #FF6B35 94.81%)",
                                    color: "white",
                                }}
                                className="text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started Now
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className=" text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600 hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-slate-800 cursor-pointer px-8 py-5"
                                >
                                Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA