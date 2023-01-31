import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  IoCalendarOutline,
  IoCalendar,
  IoMedkit,
  IoMedicalOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { RiBodyScanLine, RiShieldCheckLine, RiTimeLine } from "react-icons/ri";

import { Card, Container } from "$components";

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <main className="flex flex-col">
          <div className="flex flex-col md:flex-row my-4">
            <h1 className="font-body text-4xl md:text-6xl text-center md:text-left font-semibold capitalize text-dark my-2 leading-tight">
              We care about your <span className="text-primary">health</span>
            </h1>
            <p className="font-body text-center md:text-left text-lg font-medium text-gray-500 my-2 self-end">
              Check how your health is by professional team doctor with complete
              and modern facilities services.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col items-center md:items-stretch">
              <h3 className="text-poppins text-primary font-semibold text-2xl my-4">
                Our Advantages
              </h3>
              <div>
                <div className="flex items-center">
                  <div className="text-primary bg-primary/20 p-2 rounded-xl text-2xl">
                    <IoCalendarOutline />
                  </div>
                  <p className="font-body p-4">Make an appointment</p>
                </div>
                <div className="flex items-center">
                  <div className="text-primary bg-primary/20 p-2 rounded-xl text-2xl">
                    <RiBodyScanLine />
                  </div>
                  <p className="font-body p-4">Digital x-ray on-site</p>
                </div>
                <div className="flex items-center">
                  <div className="text-primary bg-primary/20 p-2 rounded-xl text-2xl">
                    <RiTimeLine />
                  </div>
                  <p className="font-body p-4">Emergency Services</p>
                </div>
                <div className="flex items-center">
                  <div className="text-primary bg-primary/20 p-2 rounded-xl text-2xl">
                    <RiShieldCheckLine />
                  </div>
                  <p className="font-body p-4">immunizations</p>
                </div>
              </div>
            </div>
            <div className="hidden relative sm:block">
              <Image
                className="object-fill z-10"
                src="/our-team.jpg"
                alt="Our Team"
                width={700}
                height={400}
              />
              <div className="absolute top-0 right-0 -m-2 bg-primary/50 z-0 w-[700px] h-[400px] hidden lg:block" />
            </div>
          </div>
        </main>
      </Container>
      <Container>
        <div className="flex justify-between items-center h-full">
          <div className="hidden w-1/2 h-full relative z-40 md:flex">
            <Image
              className="object-fill z-10"
              alt=""
              src="/nurse.jpg"
              width="1000"
              height="400"
            />

            <div className="absolute top-0 right-0 -m-2 bg-primary/50 z-0 w-full h-full" />
          </div>
          <div className="flex flex-col justify-center items-center md:items-stretch md:w-1/2 h-full py-8 md:p-8 mx-4">
            <h3 className="text-xl text-primary text-center md:text-left font-body font-medium">
              Quick Solution
            </h3>
            <h3 className="text-3xl text-center md:text-left text-dark font-body font-semibold py-2">
              Easy <span className="text-primary">Same</span> or Next-day
              Appointments
            </h3>
            <p className="font-body font-medium text-lg text-center md:text-left text-gray-500 py-4">
              Easily make appointment with our best doctos for you in same or
              the next day
            </p>
            <div className="my-2">
              <div className="flex items-center">
                <IoCalendar className="text-primary text-2xl" />
                <p className="font-body font-semibold text-dark capitalize p-2">
                  Easy online booking here
                </p>
              </div>
              <div className="flex items-center">
                <IoMedkit className="text-primary text-2xl" />
                <p className="font-body font-semibold text-dark capitalize p-2">
                  best quality appointment services
                </p>
              </div>
            </div>
            <button className="w-fit mt-4 rounded-lg font-body font-medium bg-primary text-gray-100 shadow py-4 px-6 capitalize">
              <Link href="/schedule">Make an appointment</Link>
            </button>
          </div>
        </div>
      </Container>
      <div className="flex flex-col justify-center h-full my-8">
        <div className="flex flex-col md:flex-row my-4">
          <div className="my-4">
            <h3 className="text-xl text-center md:text-left text-primary font-body font-medium">
              Our Services
            </h3>
            <h1 className="font-body text-center md:text-left text-3xl font-semibold text-dark my-2 leading-tight capitalize">
              The best quality services for your
              <span className="text-primary"> health</span>
            </h1>
          </div>
          <p className="font-body text-center md:text-left text-lg font-medium text-gray-500 my-2 self-end">
            Our best team doctors with complete and modern facilities will keep
            you healthy or return you to health from sick.
          </p>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-2">
          <Card
            service="Primary Care"
            description="Our certified doctors provide best medical care to help keep you healthy."
            Icon={IoMedicalOutline}
          />
          <Card
            service="Heart Care"
            description="The most advanced doctors and facility heart care in the region happen to be GetBetter."
            Icon={IoHeartOutline}
          />
          <Card
            service="Primary Care"
            description="Our certified doctors provide best medical care to help keep you healthy."
            Icon={IoMedicalOutline}
          />
          <Card
            service="Heart Care"
            description="The most advanced doctors and facility heart care in the region happen to be GetBetter."
            Icon={IoHeartOutline}
          />
          <Card
            service="Primary Care"
            description="Our certified doctors provide best medical care to help keep you healthy."
            Icon={IoMedicalOutline}
          />
          <Card
            service="Heart Care"
            description="The most advanced doctors and facility heart care in the region happen to be GetBetter."
            Icon={IoHeartOutline}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
