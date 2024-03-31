import { InstructionName } from "@/lib/refiner/instructions";

export const DEMO_TEXT = `Create Your Own Flashcards

Get started with personalized learning today! 
Simply input your flashcard content in a JSON string format, a
nd we'll take care of the rest. 
It's that easy to customize your study materials. 
Begin crafting your unique set of flashcards now and make studying more effective and tailored to your needs.

Give it a try now.`;

export const DEMO_INSTRUCTION_NAMES: InstructionName[] = ["short", "simple"];

export const SAMPLE_FLASHCARD = "[{\"question\":\"What is cloud computing?\",\"answer\":\"Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ('the cloud') to offer faster innovation, flexible resources, and economies of scale.\"},{\"question\":\"What are the three main types of cloud computing service models?\",\"answer\":\"The three main types of cloud computing service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).\"},{\"question\":\"What is a public cloud?\",\"answer\":\"A public cloud is a type of computing where services and infrastructure are hosted off-site by a cloud provider, shared across multiple organizations (tenants), and accessed via the public Internet.\"},{\"question\":\"What is a private cloud?\",\"answer\":\"A private cloud refers to cloud computing resources used exclusively by a single business or organization. The private cloud can be physically located at the organization’s on-site datacenter, or it can be hosted by a third-party service provider. However, in both cases, the services and infrastructure are maintained on a private network.\"},{\"question\":\"What is hybrid cloud computing?\",\"answer\":\"Hybrid cloud computing is a solution that combines a private cloud with one or more public cloud services, with proprietary software enabling communication between each distinct service. A hybrid cloud strategy provides businesses with greater flexibility by moving workloads between cloud solutions as needs and costs fluctuate.\"}]"
