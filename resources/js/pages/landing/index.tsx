import {Head} from '@inertiajs/react'
import React from 'react'
import LandingLayout from "@/layouts/landing-layout";
import {Navbar} from "@/components/landing-ui/navbar";
import {Hero} from "@/components/landing-ui/hero";
import {About} from "@/components/landing-ui/about";
import {HowItWorks} from "@/components/landing-ui/how-it-works";
import {Features} from "@/components/landing-ui/features";
import {Services} from "@/components/landing-ui/services";
import {Cta} from "@/components/landing-ui/cta";
import {Testimonials} from "@/components/landing-ui/testimonials";
import {Team} from "@/components/landing-ui/teams";
import {Pricing} from "@/components/landing-ui/pricing";
import {Newsletter} from "@/components/landing-ui/newsletter";
import {FAQ} from "@/components/landing-ui/faq";
import {Footer} from "@/components/landing-ui/footer";
import {ScrollToTop} from "@/components/landing-ui/scroll-to-top";

export default function LandingPage() {
    return (
        <>
            <Head title='LandingPage'/>
            <Navbar/>
            <Hero/>
            <About/>
            <HowItWorks/>
            <Features/>
            <Services/>
            <Cta/>
            <Testimonials/>
            <Team/>
            <Pricing/>
            <Newsletter/>
            <FAQ/>
            <Footer/>
            <ScrollToTop/>
        </>
    )
}

LandingPage.layout = (page: React.ReactNode) => <LandingLayout children={page}/>
