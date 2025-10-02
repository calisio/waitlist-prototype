# Overview

There are many programs that run within prisons, but often times these programs have limited seats that fill up quickly. Due to a variety of reasons, residents enrolled in a program can drop out and leave a seat open. This application is meant to help admin of the facility keep a waitlist: an ordered list of residents interested in the program once the capacity is met. If a spot is liberated in the program, admin are able to view the waitlist and backfill the spot in the class. To get onto the waitlist, residents are able to "send a kite", demonstrating interest in the program and requesting a spot on the waitlist, if all other spots are taken. All aspects of this system are recorded in an audit trail to ensure both residents and admin are held accountable.

# Personas

## Resident

Residents are individuals who are incarcerated within a prison facility. They have the ability to express interest in programs and enroll when spots become available.

## Admin

Admin are individuals who run the prison facility. They have the ability to enroll students in programs. If the program is at full capacity, they maintain a waitlist of interested residents. They have the ability to backfill a spot in a program if a spot becomes open.

# Technical Architecture

-   **Frontend**: React with TypeScript, TailwindCSS, DaisyUI components
-   **Backend**: Go
-   **Database**: Postgres

# Features

## Resident Portal

In the context of this application, a resident should be able to do the following:

-   A resident is able to send a kite to the admin which demonstrates interest in being enrolled in a specific program.
-   A resident is able to receive a confirmation when they successfully sent a kite.
-   A resident is able to receive a notification once the admin confirms receipt of the kite
-   A resident is able to receive a notification once they are added to the waitlist.
-   A resident is able to view their position on the waitlist for programs they have expressed interest in.
-   A resident is able to receive a notification if their position on the waitlist is updated.
-   A resident is able to receive a notification once they are admitted into a program.
-   A resident is able to view their notification history, which serves as an audit trail of their waitlist and enrollment changes.

## Admin Portal

In the context of this application, an admin should be able to do the following:

-   An admin is able to view kites when they are received.
-   An admin is able to confirm when a kite is recieved.
-   An admin is able to approve a kite which adds the resident to the waitlist for the requested program.
-   An admin is able to view the current enrollment list for each program.
-   An admin is able to view the waitlist for each program.
-   An admin is able to remove a resident from the waitlist.
-   An admin is able to manually reorder residents on the waitlist.
-   An admin is alerted when a resident becomes unenrolled from the program therefore a spot in the program becomes available.
-   An admin is able to enroll a resident from the waitlist into a program once a spot becomes available.
-   An admin is able to view an audit trail of all waitlist and enrollment changes for accountability.

## Program Management

-   Programs have a defined capacity (maximum number of enrolled residents).
-   The system tracks current enrollment count against capacity to determine when programs are full.
-   When a program is at capacity, new interested residents are added to the waitlist upon kite approval.
