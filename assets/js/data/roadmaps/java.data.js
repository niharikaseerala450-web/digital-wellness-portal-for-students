window.AURA_ROADMAPS = window.AURA_ROADMAPS || {};

window.AURA_ROADMAPS['java'] = {
    trackTitle: 'Enterprise Java & Distributed Systems Engineer',
    description: 'Master JVM memory architecture, multi-threading, Spring Boot 3 microservices, high-performance JPA/Hibernate, Kafka streaming, and modern cloud deployment.',
    sections: [
        {
            id: 'sec-java-jvm-memory-syntax',
            title: 'Week 1: JVM Architecture, Memory Model (JMM) & Modern Java 17/21',
            topics: [
                {
                    name: 'JVM Runtime Data Areas: Metaspace, Heap (Eden/Tenured), Stack & GC Roots',
                    definition: 'The Java Virtual Machine (JVM) divides process memory into distinct execution areas: Thread-private Stack frames and Program Counter (PC) registers, and Thread-shared Heap space and Metaspace native memory.',
                    concept: 'Every method call creates a Stack Frame holding local primitive variables and object reference pointers. The actual object allocations reside in the Young Generation (Eden and Survivor spaces S0/S1). Short-lived objects are reclaimed rapidly via Minor GC (generational hypothesis). Objects surviving age thresholds (tenuring threshold, default 15) are promoted to the Old (Tenured) Generation. Native off-heap Metaspace replaces legacy PermGen, storing class metadata dynamically without fixed size ceilings unless constrained.',
                    syntax: '// Inspecting runtime memory allocation\nRuntime runtime = Runtime.getRuntime();\nlong maxMemory = runtime.maxMemory();\nlong allocatedMemory = runtime.totalMemory();\nlong freeMemory = runtime.freeMemory();',
                    example: 'public class MemoryInspection {\n    public static void main(String[] args) {\n        Runtime rt = Runtime.getRuntime();\n        long mb = 1024 * 1024;\n        \n        System.out.println("Total Allocated: " + (rt.totalMemory() / mb) + " MB");\n        System.out.println("Max Heap (-Xmx): " + (rt.maxMemory() / mb) + " MB");\n        System.out.println("Available Processors: " + rt.availableProcessors());\n    }\n}',
                    output: 'Total Allocated: 245 MB\nMax Heap (-Xmx): 3968 MB\nAvailable Processors: 8',
                    keyPoints: [
                        'Stack allocations hold primitives and reference pointers; objects themselves live on the Heap.',
                        'Metaspace allocates from native process memory, eliminating java.lang.OutOfMemoryError: PermGen space.',
                        'GC Roots (active thread stacks, static references, JNI handles) define reachability for mark-and-sweep phases.'
                    ],
                    mistakes: [
                        'Confusing shallow heap (memory consumed by the object itself) with retained heap (shallow size plus all transitively referenced objects).',
                        'Static collections holding unused references indefinitely, preventing GC Roots disconnection and causing insidious memory leaks.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Generational Promotion Simulation',
                            desc: 'Explain how the survivor spaces S0 and S1 copy objects alternatively during Minor GC, and how the age bit header inside the Mark Word triggers promotion to Tenured space.'
                        }
                    ]
                },
                {
                    name: 'Modern Java Features: Records, Pattern Matching & Sealed Hierarchies',
                    definition: 'Modern Java (17 LTS and 21 LTS) incorporates data-oriented programming via immutable records, exhaustive type pattern matching, and sealed domain hierarchies.',
                    concept: 'Java Records provide concise syntax for immutable data carriers, auto-generating constructors, accessors, equals(), hashCode(), and toString(). Sealed classes and interfaces strictly declare which subclasses can extend or implement them using the permits clause. When combined with switch pattern matching, the Java compiler enforces exhaustive case handling at compile time, eliminating defensive default branches and runtime instanceof casts.',
                    syntax: '// Sealed hierarchy with record data carriers\npublic sealed interface PaymentMethod permits CreditCard, UPI, Crypto {}\n\npublic record CreditCard(String pan, String expiry) implements PaymentMethod {}\npublic record UPI(String vpa) implements PaymentMethod {}\npublic record Crypto(String walletAddress) implements PaymentMethod {}',
                    example: 'public class PatternMatchingDemo {\n    public sealed interface DomainEvent permits OrderCreated, OrderShipped {}\n    public record OrderCreated(String orderId, double amount) implements DomainEvent {}\n    public record OrderShipped(String orderId, String trackingCode) implements DomainEvent {}\n\n    public static String handleEvent(DomainEvent event) {\n        // Exhaustive switch expression - no default branch required\n        return switch (event) {\n            case OrderCreated(String id, double amt) when amt > 1000.0 -> \n                "High-value Order: " + id + " ($" + amt + ")";\n            case OrderCreated(String id, double amt) -> \n                "Standard Order: " + id;\n            case OrderShipped(String id, String code) -> \n                "Shipped: " + id + " via " + code;\n        };\n    }\n\n    public static void main(String[] args) {\n        DomainEvent event = new OrderCreated("ORD-9821", 1450.00);\n        System.out.println(handleEvent(event));\n    }\n}',
                    output: 'High-value Order: ORD-9821 ($1450.0)',
                    keyPoints: [
                        'Record fields are final and shallowly immutable; if a record holds a reference to a mutable List, list contents can still be mutated.',
                        'Sealed types restrict interface inheritance to explicit domain boundaries, enabling compiler exhaustiveness checking in switch expressions.',
                        'Pattern matching deconstructs record components directly in argument positions, eliminating manual boilerplate casts.'
                    ],
                    mistakes: [
                        'Treating a Record containing a mutable java.util.List as completely thread-safe without creating an unmodifiable defensive copy (List.copyOf()).',
                        'Adding unnecessary default clauses to sealed switch expressions, which blinds the compiler to newly added domain variants in future updates.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Algebraic Data Modeling with Sealed Hierarchies',
                            desc: 'Design an exhaustive Result<T, E> type hierarchy using a sealed interface with Success<T> and Failure<E> records and deconstruct it using a modern switch expression.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 1 Assessment: JVM Architecture, Memory Layout & Modern Java Syntax',
                questions: [
                    {
                        question: '1. Where are the actual instances of objects allocated in the Java Virtual Machine during standard execution?',
                        options: ['On the thread execution Stack', 'Inside the native Metaspace', 'On the Heap memory', 'Inside CPU instruction registers'],
                        correct: 2,
                        explanation: 'While references and primitives within method scopes reside on thread stacks, object instances are allocated on the shared Heap memory.'
                    },
                    {
                        question: '2. What structural improvement did Metaspace introduce in Java 8 to replace the legacy Permanent Generation (PermGen)?',
                        options: ['It automatically compresses bytecode with gzip', 'It uses native OS process memory rather than contiguous heap memory, avoiding fixed-size PermGen OutOfMemoryErrors', 'It stores thread stacks exclusively', 'It eliminates class loading entirely'],
                        correct: 1,
                        explanation: 'Metaspace dynamically allocates class metadata from native memory, resizing automatically up to OS limits unless constrained by MaxMetaspaceSize.'
                    },
                    {
                        question: '3. What guarantees does a Java record class offer regarding its declared state fields?',
                        options: ['Fields are volatile and mutable', 'Fields are private, final, and immutable references by default', 'Fields are synchronized during access', 'Fields are transient'],
                        correct: 1,
                        explanation: 'Records are canonical data carriers whose fields are implicitly private and final, producing shallowly immutable data objects.'
                    },
                    {
                        question: '4. What is the role of the permits keyword when declaring a sealed interface or class in Java 17+?',
                        options: ['It grants permission for reflection access', 'It explicitly enumerates the exhaustive set of classes or interfaces authorized to extend or implement the type', 'It exposes classes to public network endpoints', 'It defines database permissions'],
                        correct: 1,
                        explanation: 'The permits clause declares exactly which subclasses can inherit from the sealed type, enabling the compiler to verify exhaustive pattern matching.'
                    },
                    {
                        question: '5. What happens during Minor Garbage Collection in the HotSpot JVM when an object in Eden survives collection?',
                        options: ['It is immediately written to disk', 'It is copied into one of the Survivor spaces (S0/S1) and its tenure age counter is incremented', 'It is moved directly to Metaspace', 'It is converted to a weak reference'],
                        correct: 1,
                        explanation: 'Surviving objects in Eden are moved to the active Survivor space with their age counter incremented in the Mark Word until reaching the tenuring threshold.'
                    },
                    {
                        question: '6. What is a "GC Root" in JVM garbage collection algorithms?',
                        options: ['The root folder where the JDK is installed', 'An initial object reference known to be directly accessible (e.g., active thread local stack variables, static classes, JNI handles) from which reachability is traversed', 'The main method declaration', 'The file system root partition'],
                        correct: 1,
                        explanation: 'GC tracing starts from GC Roots (thread stack frames, static references, JNI pointers). Any object unreachable from these roots is eligible for collection.'
                    },
                    {
                        question: '7. Why does switch pattern matching over a sealed interface not require a default case clause?',
                        options: ['Switch statements never require default branches in Java', 'The compiler knows every permissible permitted subtype at compile time and can guarantee exhaustiveness', 'The JVM generates random fallbacks', 'Sealed interfaces convert to enums'],
                        correct: 1,
                        explanation: 'Because sealed hierarchies explicitly restrict implementations, the compiler verifies all possible cases are handled, making a default clause redundant.'
                    },
                    {
                        question: '8. What is the fundamental difference between Shallow Heap and Retained Heap in a JVM heap dump analysis?',
                        options: ['Shallow heap is measured in bytes; Retained heap is measured in bits', 'Shallow heap is the memory consumed by the object itself; Retained heap is shallow size plus memory of all objects kept alive transitively through it', 'Shallow heap resides on the stack', 'Retained heap includes database memory'],
                        correct: 1,
                        explanation: 'Shallow heap is the object’s direct footprint. Retained heap is the amount of total memory that would be freed if this specific object were garbage collected.'
                    },
                    {
                        question: '9. What occurs when a Java Record contains a reference to a java.util.ArrayList?',
                        options: ['The list becomes completely immutable automatically', 'The reference to the list is final and cannot be reassigned, but elements inside the list can still be added or modified', 'The compiler throws a compilation error', 'The list converts to an array'],
                        correct: 1,
                        explanation: 'Records enforce shallow immutability: the list reference variable cannot point to another list, but the list instance itself remains mutable.'
                    },
                    {
                        question: '10. What does the JVM flag -XX:+UseStringDeduplication achieve when using G1 Garbage Collector?',
                        options: ['Deletes duplicate string variables from source code', 'Identifies duplicate char/byte arrays across distinct String objects on the heap and points them to a single shared array, saving memory', 'Converts strings to integer hashes', 'Prohibits string concatenation'],
                        correct: 1,
                        explanation: 'String deduplication scans the heap during background GC to replace identical backing byte arrays across distinct String instances with shared pointers.'
                    },
                    {
                        question: '11. In Java 21, what feature does the statement case OrderCreated(String id, double amt) when amt > 1000 demonstrate?',
                        options: ['Regular expression matching', 'Record pattern matching combined with a guarded condition (when clause)', 'Reflective parameter extraction', 'Dynamic bytecode injection'],
                        correct: 1,
                        explanation: 'This combines record pattern deconstruction (extracting fields directly) with a boolean guard expression (when) to refine matching branches.'
                    },
                    {
                        question: '12. What does an OutOfMemoryError: Java heap space indicate?',
                        options: ['The OS ran out of swap memory', 'The garbage collector spent excessive effort and could not reclaim sufficient heap space to satisfy a new allocation request', 'The thread call stack exceeded depth limits', 'Metaspace exceeded memory limits'],
                        correct: 1,
                        explanation: 'Java throws heap space OOM when live, reachable objects fill up the allocated heap (-Xmx) and GC cannot free space for a new object allocation.'
                    },
                    {
                        question: '13. What is the purpose of the Java Program Counter (PC) Register in JVM architecture?',
                        options: ['Counts the number of running CPU cores', 'Stores the address of the JVM bytecode instruction currently being executed by a specific thread', 'Tracks total database transactions', 'Maintains system clock time'],
                        correct: 1,
                        explanation: 'Each JVM thread has its own private PC register pointing to the current executing bytecode instruction.'
                    },
                    {
                        question: '14. What occurs when an object reaches the maximum tenuring threshold (e.g., -XX:MaxTenuringThreshold=15) in the JVM?',
                        options: ['The object is written to disk swap', 'The object is promoted from the Survivor space to the Old (Tenured) Generation space', 'The object is forcefully garbage collected', 'The object is marked as immutable'],
                        correct: 1,
                        explanation: 'Objects that survive multiple minor GC cycles up to the tenuring threshold are promoted to the Old Generation for long-lived retention.'
                    },
                    {
                        question: '15. What is the visibility rule of Compact Constructors in Java Records?',
                        options: ['They must be declared private', 'They do not declare parameter lists and can modify fields before canonical assignment takes place', 'They run in a separate background thread', 'They cannot contain validation logic'],
                        correct: 1,
                        explanation: 'Compact constructors omit parameter declarations (public Order { ... }) and are used for parameter validation and normalization before field binding.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-concurrency-virtual-threads',
            title: 'Week 2: Advanced Concurrency, JMM, Atomics & Virtual Threads (Project Loom)',
            topics: [
                {
                    name: 'Java Memory Model (JMM): Happens-Before, Volatile & CAS Atomics',
                    definition: 'The Java Memory Model (JMM) defines the formal semantic rules specifying how the JVM and CPU hardware caches interact to guarantee visibility, ordering, and atomicity across concurrent execution threads.',
                    concept: 'CPUs utilize multi-tiered L1/L2/L3 hardware caches and reorder execution instructions for pipeline optimization. Without synchronization, writes by one thread remain stuck in local store buffers, invisible to other threads. The volatile keyword establishes a "Happens-Before" edge via memory barriers (load-load, store-store, store-load fences), preventing instruction reordering and ensuring immediate cross-thread visibility. For lock-free atomic state mutation, Compare-And-Swap (CAS) instructions utilize native CPU primitives (CMPXCHG) to update values without locking or thread suspension overhead.',
                    syntax: 'import java.util.concurrent.atomic.AtomicInteger;\n\n// Lock-free atomic increment via CPU CAS loop\nAtomicInteger counter = new AtomicInteger(0);\nint updated = counter.incrementAndGet();\nboolean swapped = counter.compareAndSet(1, 10);',
                    example: 'import java.util.concurrent.atomic.AtomicReference;\n\n// Lock-free concurrent stack node implementation\npublic class LockFreeStack<T> {\n    private static class Node<T> {\n        final T value;\n        Node<T> next;\n        Node(T val) { this.value = val; }\n    }\n\n    private final AtomicReference<Node<T>> top = new AtomicReference<>(null);\n\n    public void push(T item) {\n        Node<T> newHead = new Node<>(item);\n        Node<T> currentHead;\n        do {\n            currentHead = top.get();\n            newHead.next = currentHead;\n        } while (!top.compareAndSet(currentHead, newHead));\n    }\n\n    public T pop() {\n        Node<T> currentHead;\n        Node<T> newHead;\n        do {\n            currentHead = top.get();\n            if (currentHead == null) return null;\n            newHead = currentHead.next;\n        } while (!top.compareAndSet(currentHead, newHead));\n        return currentHead.value;\n    }\n\n    public static void main(String[] args) {\n        LockFreeStack<String> stack = new LockFreeStack<>();\n        stack.push("Alpha");\n        stack.push("Beta");\n        System.out.println("Popped: " + stack.pop());\n        System.out.println("Popped: " + stack.pop());\n    }\n}',
                    output: 'Popped: Beta\nPopped: Alpha',
                    keyPoints: [
                        'The volatile keyword guarantees visibility and ordering (prevents reordering), but does NOT guarantee atomicity for compound operations like count++.',
                        'Happens-Before guarantees that memory writes by one action are visible to a subsequent action across threads.',
                        'Atomic primitives (AtomicInteger, LongAdder) utilize lock-free CPU CAS instructions; LongAdder shards cells under heavy contention to prevent cache-line bouncing.'
                    ],
                    mistakes: [
                        'Using volatile int counter and performing counter++, which compiles to three discrete bytecode operations (read, modify, write), producing silent race conditions.',
                        'Failing to recognize false sharing where independent variables accessed by different threads sit on the same 64-byte CPU cache line.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Treiber Stack Implementation',
                            desc: 'Implement a lock-free thread-safe Treiber Stack using AtomicReference and verify that it avoids race conditions under concurrent producer/consumer load.'
                        }
                    ]
                },
                {
                    name: 'Virtual Threads (Project Loom) & Structured Concurrency',
                    definition: 'Virtual threads are lightweight, user-mode threads managed directly by the JVM runtime rather than 1:1 mapping to kernel OS threads, designed for high-throughput concurrent I/O.',
                    concept: 'Traditional platform threads map 1:1 to OS kernel threads, each requiring ~1MB of reserved memory stack space and costly OS context switches, limiting application scale to a few thousand concurrent threads. Virtual threads (Java 21 LTS) run on top of a small pool of carrier platform threads (ForkJoinPool). When a virtual thread performs a blocking I/O operation (socket read, file sleep), the runtime unmounts the virtual thread from the carrier thread, parking its continuation stack in the JVM heap. The carrier thread immediately executes other tasks until the I/O completes, scaling concurrency to millions of parallel tasks.',
                    syntax: 'import java.util.concurrent.Executors;\n\n// Launching virtual threads per task\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    executor.submit(() -> {\n        // Blocking network I/O parks continuation on heap, freeing carrier thread\n        Thread.sleep(1000);\n        return "Result payload";\n    });\n}',
                    example: 'import java.util.concurrent.Executors;\nimport java.util.stream.IntStream;\nimport java.time.Duration;\nimport java.time.Instant;\n\npublic class VirtualThreadScale {\n    public static void main(String[] args) {\n        Instant start = Instant.now();\n        int taskCount = 10_000;\n\n        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n            IntStream.range(0, taskCount).forEach(i -> {\n                executor.submit(() -> {\n                    try {\n                        Thread.sleep(100); // Non-blocking park of virtual thread\n                    } catch (InterruptedException e) {\n                        Thread.currentThread().interrupt();\n                    }\n                });\n            });\n        }\n\n        Instant finish = Instant.now();\n        long elapsed = Duration.between(start, finish).toMillis();\n        System.out.println("Completed " + taskCount + " concurrent tasks in: " + elapsed + " ms");\n    }\n}',
                    output: 'Completed 10000 concurrent tasks in: 342 ms',
                    keyPoints: [
                        'Virtual threads are designed for I/O-bound throughput, not CPU-bound intensive parallel computation (which still relies on ForkJoinPool or parallel streams).',
                        'Never pool virtual threads; they are cheap and short-lived, designed to be spawned per request and discarded.',
                        'Thread pinning occurs when a virtual thread blocks inside a synchronized block/method or native JNI call, temporarily locking the underlying carrier thread.'
                    ],
                    mistakes: [
                        'Applying newVirtualThreadPerTaskExecutor() to heavy CPU number-crunching algorithms expecting speedups; virtual threads still compete for the same physical CPU cores.',
                        'Using legacy synchronized methods for mutual exclusion around slow blocking I/O, triggering thread pinning; use java.util.concurrent.locks.ReentrantLock instead.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Pinning Detection & Diagnostic Migration',
                            desc: 'Identify code segments that pin carrier threads using -Djdk.tracePinnedThreads=full and refactor synchronized blocks to ReentrantLock.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 2 Assessment: Concurrency, Memory Barriers, Atomics & Virtual Threads',
                questions: [
                    {
                        question: '1. What guarantee does the volatile modifier provide according to the Java Memory Model (JMM)?',
                        options: ['It makes compound operations like counter++ thread-safe and atomic', 'It ensures immediate visibility of writes across threads and prevents instruction reordering around memory barriers', 'It locks the entire class definition', 'It persists the variable state to disk storage'],
                        correct: 1,
                        explanation: 'Volatile establishes a happens-before relationship, inserting memory fences that ensure writes are flushed to main memory and reordering is inhibited, without providing atomicity for compound steps.'
                    },
                    {
                        question: '2. Why is volatile int counter followed by counter++ unsafe under concurrent multi-threaded execution?',
                        options: ['Volatile variables cannot be incremented', 'The increment operation expands to read, update, and write bytecode steps; concurrent threads can interleave between these steps, causing lost updates', 'Volatile throws an IllegalStateException', 'It causes the JVM to run out of memory'],
                        correct: 1,
                        explanation: 'counter++ is not atomic; it reads the current value, computes the increment, and writes back. If two threads read simultaneously, one update is overwritten.'
                    },
                    {
                        question: '3. What underlying hardware instruction mechanism do classes like AtomicInteger and AtomicReference rely on?',
                        options: ['Operating system file locks', 'Compare-And-Swap (CAS) native hardware instructions (e.g., CMPXCHG on x86)', 'Full JVM garbage collection pauses', 'Heavyweight kernel mutexes'],
                        correct: 1,
                        explanation: 'Atomics use CPU-level Compare-And-Swap primitives to perform optimistic, lock-free updates by retrying only when concurrent collisions occur.'
                    },
                    {
                        question: '4. How do Virtual Threads in Java 21 achieve massive scalability compared to traditional Platform Threads?',
                        options: ['They run exclusively inside GPU shaders', 'They are lightweight user-space threads whose call frames reside on the JVM heap; when blocked on I/O, they unmount from carrier threads, freeing OS resources', 'They disable memory garbage collection', 'They convert all code into asynchronous callbacks'],
                        correct: 1,
                        explanation: 'Virtual threads decouple Java threads from 1:1 OS kernel mappings. When blocking on I/O, the JVM parks the execution continuation on the heap and reuses the carrier thread.'
                    },
                    {
                        question: '5. What happens during "Thread Pinning" in a Java Virtual Thread execution context?',
                        options: ['The thread priority is elevated to maximum', 'A virtual thread executes inside a synchronized block/method or JNI call while blocking, preventing the JVM from unmounting it and tying up the carrier thread', 'The thread is terminated by the OS', 'The thread is permanently pinned to CPU core 0'],
                        correct: 1,
                        explanation: 'Pinning occurs when a virtual thread performs blocking operations while holding a synchronized monitor or native frame, preventing the carrier thread from serving other virtual threads.'
                    },
                    {
                        question: '6. Why should you avoid pooling Virtual Threads using legacy patterns like ThreadPoolExecutor?',
                        options: ['Virtual threads do not support Runnable tasks', 'Virtual threads are lightweight (~1KB footprint) and designed to be ephemeral: created per task and garbage-collected, making pooling counter-productive', 'Pooling virtual threads throws an UnsupportedOperationException', 'Pooled virtual threads leak memory in Metaspace'],
                        correct: 1,
                        explanation: 'Unlike heavy OS platform threads, virtual threads have negligible allocation overhead; pooling them introduces unnecessary queuing complexity and overhead.'
                    },
                    {
                        question: '7. What advantage does LongAdder provide over AtomicLong in high-contention multi-threaded write scenarios?',
                        options: ['It uses 128-bit numbers', 'It shards the accumulator across an array of internal cell variables to reduce CAS retry contention under heavy traffic, summing cells on read', 'It uses pessimistic database locks', 'It guarantees ordered sequential reads'],
                        correct: 1,
                        explanation: 'LongAdder maintains a striped array of cell counters. Threads update independent cells when contention occurs, minimizing cache-line bouncing and CAS failures.'
                    },
                    {
                        question: '8. What is the role of ReentrantLock as a replacement for legacy synchronized blocks when adopting Virtual Threads?',
                        options: ['ReentrantLock runs faster on single-core systems', 'ReentrantLock is an explicit lock implementation that does not pin virtual threads to their carrier threads when blocking on conditions', 'ReentrantLock disables thread interruptions', 'ReentrantLock prevents deadlocks automatically'],
                        correct: 1,
                        explanation: 'ReentrantLock uses LockSupport.park(), allowing the virtual thread scheduler to cleanly unmount the virtual thread from the carrier thread without pinning.'
                    },
                    {
                        question: '9. What does the "Happens-Before" relationship establish in the Java Memory Model?',
                        options: ['The compile-time order of class files', 'A formal ordering guarantee that memory modifications made by statement A are guaranteed to be visible to statement B across threads', 'The chronological system timestamp of thread execution', 'The network packet sequence order'],
                        correct: 1,
                        explanation: 'Happens-before guarantees that actions performed by one thread are visibly observed by another thread without data races.'
                    },
                    {
                        question: '10. What type of workload is LEAST suited for optimization with Java Virtual Threads?',
                        options: ['Microservice HTTP REST endpoints calling downstream databases', 'Long-running, purely CPU-intensive computations (e.g., video rendering, matrix multiplication, cryptographic hashing)', 'High-volume file streaming reads', 'Asynchronous message consumer polling'],
                        correct: 1,
                        explanation: 'CPU-bound tasks require continuous physical execution cores; virtual threads cannot add physical CPU capacity and offer no throughput gains over standard pools for heavy compute.'
                    },
                    {
                        question: '11. What is False Sharing in high-performance concurrent software engineering?',
                        options: ['Threads sharing file descriptors incorrectly', 'Two threads modifying independent variables that reside on the same 64-byte CPU cache line, triggering unnecessary hardware cache-invalidation cycles', 'Threads misreporting queue depths', 'Multiple processes accessing the same socket port'],
                        correct: 1,
                        explanation: 'When distinct variables share the same hardware cache line, updates by one core invalidate the other core\'s cache line, degrading performance.'
                    },
                    {
                        question: '12. What does Thread.currentThread().isVirtual() return when executed inside a thread created by Thread.ofVirtual().start(...)?',
                        options: ['false', 'true', 'null', 'Throws an IllegalAccessException'],
                        correct: 1,
                        explanation: 'Thread.isVirtual() returns true if the executing thread instance is a virtual thread rather than a platform thread.'
                    },
                    {
                        question: '13. What is the role of CountDownLatch in concurrent coordination?',
                        options: ['Acts as a lock-free queue', 'Causes one or more threads to wait until a designated set of operations executing in other threads completes (countdown reaches zero)', 'Counts total CPU instructions executed', 'Allocates heap memory for background workers'],
                        correct: 1,
                        explanation: 'CountDownLatch initializes with a count; calling await() blocks until other threads decrement the count to zero via countDown().'
                    },
                    {
                        question: '14. What occurs when a Virtual Thread executes Thread.sleep(Duration.ofSeconds(10))?',
                        options: ['The underlying OS kernel thread is blocked and goes to sleep for 10 seconds', 'The virtual thread unmounts from its carrier thread and schedules a timer continuation, freeing the carrier thread to execute other work', 'An InterruptedException is thrown immediately', 'The JVM enters a global safepoint pause'],
                        correct: 1,
                        explanation: 'Thread.sleep() in Java 21 is virtual-thread aware; it suspends the virtual thread continuation without locking the underlying carrier platform thread.'
                    },
                    {
                        question: '15. What diagnostic JVM flag highlights carrier thread pinning occurrences during runtime execution?',
                        options: ['-XX:+PrintGCDetails', '-Djdk.tracePinnedThreads=full', '-XX:+UseG1GC', '-Djava.security.debug=all'],
                        correct: 1,
                        explanation: '-Djdk.tracePinnedThreads=full instructs the runtime to print full stack traces whenever a virtual thread blocks while pinned to its carrier thread.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-collections-generics-streams',
            title: 'Week 3: Collections Internals, Generics (PECS) & High-Performance Streams',
            topics: [
                {
                    name: 'HashMap Internals: Hash Collision Resolution, Treeification & Bitwise Indexing',
                    definition: 'Java HashMap implements an array of hash buckets using a power-of-two capacity, resolving collisions via linked lists that convert to balanced Red-Black Trees (TreeNodes) under high collision density.',
                    concept: 'Bucket indices are calculated using bitwise masking: index = (n - 1) & hash, which requires table capacity ($n$) to strictly remain a power of 2 ($2^k$). When multiple keys hash to the same bucket (collision), nodes chain into singly linked lists. When bucket item count reaches TREEIFY_THRESHOLD (8) and total capacity is at least MIN_TREEIFY_CAPACITY (64), the linked list converts into a balanced Red-Black Tree, improving worst-case search complexity from $O(N)$ to $O(\\log N)$ to defend against HashDoS denial-of-service attacks.',
                    syntax: '// Pre-sizing a HashMap to prevent dynamic resizing/rehashing overhead\n// Formula: initialCapacity = (expectedEntries / loadFactor) + 1\nint expectedItems = 100_000;\nMap<String, UserSession> sessionMap = new HashMap<>((int) Math.ceil(expectedItems / 0.75f) + 1);',
                    example: 'public class HashCollisionDemo {\n    static final class CollidingKey {\n        final String id;\n        CollidingKey(String id) { this.id = id; }\n        \n        @Override\n        public int hashCode() {\n            return 42; // Force identical bucket placement\n        }\n        \n        @Override\n        public boolean equals(Object obj) {\n            return obj instanceof CollidingKey other && this.id.equals(other.id);\n        }\n    }\n\n    public static void main(String[] args) {\n        java.util.Map<CollidingKey, String> map = new java.util.HashMap<>();\n        for (int i = 1; i <= 10; i++) {\n            map.put(new CollidingKey("K" + i), "Val_" + i);\n        }\n        System.out.println("All colliding keys stored successfully. Size: " + map.size());\n    }\n}',
                    output: 'All colliding keys stored successfully. Size: 10',
                    keyPoints: [
                        'HashMap capacity is always a power of 2 so (n - 1) & hash distributes bits uniformly without costly modulo (%) arithmetic.',
                        'Treeification triggers at 8 items per bucket and capacity >= 64; untreeification back to a list triggers at 6 items during resize.',
                        'If equals() is overridden, hashCode() MUST be overridden to maintain the contract: equal objects must yield identical hash codes.'
                    ],
                    mistakes: [
                        'Using mutable objects as HashMap keys and mutating their properties after insertion, permanently losing the ability to retrieve them.',
                        'Failing to pre-size HashMaps for large workloads, triggering multiple expensive rehash cycles where the entire internal array is doubled and reallocated.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'ConcurrentHashMap Striped Counter',
                            desc: 'Explain how ConcurrentHashMap achieves thread-safety without global locks using synchronized node heads and CAS operations for empty buckets.'
                        }
                    ]
                },
                {
                    name: 'Generics Deep Dive: Type Erasure, Bridge Methods & PECS Rule',
                    definition: 'Java Generics provide compile-time type safety through parameterized types, enforce strict invariance by default, and are erased at runtime down to raw types or upper bounds.',
                    concept: 'To ensure backward compatibility with legacy Java 1.4 bytecode, generic type arguments are erased by the compiler (Type Erasure) and replaced with their bounds (or Object), inserting synthetic bridge methods when overriding polymorphic methods. Because generics are invariant (List<Dog> is not a subtype of List<Animal>), wildcard variance is governed by PECS: "Producer Extends, Consumer Super". Use <? extends T> when reading elements from a structure (covariant producer), and <? super T> when writing elements into a structure (contravariant consumer).',
                    syntax: '// PECS in action: Collections.copy method signature\npublic static <T> void copy(List<? super T> dest, List<? extends T> src) {\n    for (int i = 0; i < src.size(); i++) {\n        dest.set(i, src.get(i)); // Read from producer, write to consumer\n    }\n}',
                    example: 'import java.util.*;\n\npublic class GenericsPecsDemo {\n    public static double sumOfNumbers(List<? extends Number> numbers) {\n        double total = 0.0;\n        for (Number n : numbers) {\n            total += n.doubleValue(); // Safe to read as Number\n        }\n        return total;\n    }\n\n    public static void appendIntegers(List<? super Integer> consumerList) {\n        consumerList.add(100); // Safe to write Integer\n        consumerList.add(200);\n    }\n\n    public static void main(String[] args) {\n        List<Double> doubleList = List.of(12.5, 7.5, 10.0);\n        System.out.println("Sum from Producer: " + sumOfNumbers(doubleList));\n\n        List<Number> numList = new ArrayList<>();\n        appendIntegers(numList);\n        System.out.println("Items in Consumer list: " + numList);\n    }\n}',
                    output: 'Sum from Producer: 30.0\nItems in Consumer list: [100, 200]',
                    keyPoints: [
                        'Generics are strictly invariant: List<String> cannot be passed where List<Object> is expected.',
                        'Producer Extends (? extends T): Read-only access to T; cannot write anything except null.',
                        'Consumer Super (? super T): Write access for instances of T; reading only returns Object.'
                    ],
                    mistakes: [
                        'Attempting to instantiate generic types directly (new T()) or create generic arrays (new T[10]), which fail due to runtime type erasure.',
                        'Attempting to add elements to a List<? extends T> collection, which causes a compile-time error.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Type-Safe Heterogeneous Container',
                            desc: 'Implement a type-safe heterogeneous container map (Favorites) using parameterized Class<T> keys and dynamic casting.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 3 Assessment: Collections Internals, Generics & Stream Dynamics',
                questions: [
                    {
                        question: '1. Why does the HotSpot HashMap enforce internal array capacity to always be a power of two ($2^n$)?',
                        options: ['To minimize JVM heap memory usage', 'To compute bucket indices using bitwise AND ((capacity - 1) & hash) instead of costly integer modulo division', 'To prevent class unloading errors', 'To support multi-threaded concurrent reads natively'],
                        correct: 1,
                        explanation: 'Bitwise AND (n - 1) & hash is substantially faster on CPU instruction sets than integer division or modulo operators, but mathematically requires n to be a power of 2.'
                    },
                    {
                        question: '2. What condition triggers a HashMap collision bucket to treeify from a singly linked list into a balanced Red-Black Tree?',
                        options: ['When the map hits 1,000 entries', 'When bucket chain length reaches 8 (TREEIFY_THRESHOLD) and total table capacity is at least 64 (MIN_TREEIFY_CAPACITY)', 'When garbage collection runs', 'When two keys have identical hash codes'],
                        correct: 1,
                        explanation: 'If bucket depth reaches 8 but capacity is under 64, the table resizes instead; if capacity is at least 64, the bucket converts into a TreeNode Red-Black tree.'
                    },
                    {
                        question: '3. What is the fundamental principle of the PECS rule in Java Generics?',
                        options: ['Parent Extends, Child Super', 'Producer Extends, Consumer Super: use ? extends T if you only read from a generic structure, and ? super T if you write into it', 'Primitive Extends, Class Super', 'Private Extends, Constant Super'],
                        correct: 1,
                        explanation: 'PECS dictates wildcards: use <? extends T> for covariant producers (reading), and <? super T> for contravariant consumers (writing).'
                    },
                    {
                        question: '4. What does the Java compiler do during Type Erasure for an unbounded generic type <T>?',
                        options: ['Converts T to a native C pointer', 'Removes all generic type parameters from bytecode and replaces T with java.lang.Object, inserting explicit casts where needed', 'Creates duplicate compiled classes for each instantiated type argument', 'Throws a runtime exception on generic method invocations'],
                        correct: 1,
                        explanation: 'Type erasure wipes out type parameter information at compile time, replacing unbounded types with Object and inserting casts to preserve binary compatibility with older JVM versions.'
                    },
                    {
                        question: '5. What happens if you try to invoke list.add("hello") on a reference declared as List<? extends Object> list?',
                        options: ['The string is added successfully', 'A compile-time error occurs because the compiler cannot guarantee what specific concrete subtype the wildcard represents', 'A runtime ClassCastException is thrown', 'The element is appended at index 0'],
                        correct: 1,
                        explanation: 'With covariant wildcards (? extends ...), the compiler cannot verify the concrete target type, blocking all write operations except inserting null.'
                    },
                    {
                        question: '6. Why does ConcurrentHashMap use synchronized blocks on the head node of individual buckets rather than locking the entire map?',
                        options: ['Because locking the entire map causes segmentation faults', 'To achieve high write concurrency through fine-grained bucket-level locking, allowing independent buckets to be modified in parallel', 'Because Java 8 eliminated reentrant locks', 'To prevent out of memory errors'],
                        correct: 1,
                        explanation: 'ConcurrentHashMap locks only the head node of the specific bucket being updated, allowing threads writing to different buckets to proceed concurrently.'
                    },
                    {
                        question: '7. What thread pool executes parallelStream() operations by default if no custom executor is supplied?',
                        options: ['Executors.newCachedThreadPool()', 'The common JVM-wide ForkJoinPool.commonPool()', 'A new VirtualThreadPerTaskExecutor', 'The OS thread scheduler'],
                        correct: 1,
                        explanation: 'Parallel streams use the shared JVM-wide ForkJoinPool.commonPool(), which means long-running or blocking tasks can starve other parallel stream operations across the application.'
                    },
                    {
                        question: '8. What happens when two distinct keys yield identical hashCode() values in a standard Java HashMap?',
                        options: ['An OverlappingKeyException is thrown', 'A hash collision occurs; both key-value pairs are stored in the same bucket, distinguished by their equals() method', 'The second key overwrites the first key value immediately', 'The JVM terminates'],
                        correct: 1,
                        explanation: 'Colliding keys share the bucket and form a linked list (or Red-Black tree); during lookups, equals() identifies the exact target entry.'
                    },
                    {
                        question: '9. Why does Arrays.asList(array) throw an UnsupportedOperationException when calling .add() on the returned list?',
                        options: ['The array is stored in Metaspace', 'It returns a fixed-size wrapper view backed directly by the underlying array, which does not support structural size modifications', 'The list is frozen by security policies', 'Array elements are marked final'],
                        correct: 1,
                        explanation: 'Arrays.asList() returns an internal fixed-size wrapper over the array; updating elements via .set() is allowed, but adding or removing elements throws an exception.'
                    },
                    {
                        question: '10. What is a synthetic "Bridge Method" generated by the Java compiler during generic inheritance?',
                        options: ['A method that connects network sockets', 'A compiler-generated method that preserves polymorphic method overriding when generic type erasure alters method parameter signatures', 'A method connecting Java code to native C code via JNI', 'A constructor for record types'],
                        correct: 1,
                        explanation: 'Because type erasure erases parameterized types to raw types or bounds, the compiler generates synthetic bridge methods to ensure polymorphic dispatch behaves correctly.'
                    },
                    {
                        question: '11. What is the contract requirement between equals() and hashCode() in Java?',
                        options: ['If two objects have the same hashCode(), they must be equal via equals()', 'If two objects are equal via equals(), they MUST return the same integer from hashCode()', 'hashCode() must return positive values', 'equals() must compare object memory addresses only'],
                        correct: 1,
                        explanation: 'The contract specifies: if a.equals(b) is true, then a.hashCode() == b.hashCode() must also be true. The reverse is not required (collisions are permitted).'
                    },
                    {
                        question: '12. What distinguishes intermediate Stream operations from terminal Stream operations in the Java Streams API?',
                        options: ['Intermediate operations return void; terminal operations return streams', 'Intermediate operations are lazy and return a new Stream without executing until a terminal operation triggers processing', 'Intermediate operations run on background threads', 'Intermediate operations mutate the underlying collection'],
                        correct: 1,
                        explanation: 'Intermediate operations (e.g., filter(), map()) configure the pipeline lazily; evaluation occurs only when a terminal operation (e.g., collect(), reduce()) is called.'
                    },
                    {
                        question: '13. Why should you avoid executing blocking network or I/O calls inside a standard parallelStream()?',
                        options: ['Blocking I/O throws a checked StreamExecutionException', 'It blocks threads in the shared ForkJoinPool.commonPool(), which can degrade performance for parallel streams across the entire JVM process', 'Parallel streams only accept pure primitive types', 'Streams automatically cancel blocked threads'],
                        correct: 1,
                        explanation: 'Because ForkJoinPool.commonPool() has a fixed size tied to available CPU cores, blocking its worker threads on I/O starves other CPU-bound parallel streams in the system.'
                    },
                    {
                        question: '14. What occurs when a HashMap reaches its resize threshold (capacity * loadFactor)?',
                        options: ['Old items are dropped from memory', 'The backing table array doubles in size ($2 \\times$), and existing entries are rehashed/re-indexed to new positions', 'The map locks and becomes read-only', 'An OutOfMemoryError is thrown'],
                        correct: 1,
                        explanation: 'When entries exceed the threshold, HashMap allocates a new array of double capacity and migrates nodes to their updated bitwise bucket coordinates.'
                    },
                    {
                        question: '15. What is the difference between Comparable<T> and Comparator<T> in Java?',
                        options: ['Comparable defines natural ordering via compareTo() within the class itself; Comparator defines external or custom sorting strategies via compare()', 'Comparable only works on integers', 'Comparator is deprecated in modern Java', 'Comparable is used for multi-threading'],
                        correct: 0,
                        explanation: 'Comparable provides the intrinsic natural order for an object (this.compareTo(other)), while Comparator supplies customizable external ordering logic.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-spring-core-aop',
            title: 'Week 4: Spring Core Internals — IoC, Bean Lifecycle & AOP Proxies',
            topics: [
                {
                    name: 'ApplicationContext Internals: BeanDefinition, Lifecycle & Circular Dependencies',
                    definition: 'The Spring IoC container abstracts object instantiations and dependencies into declarative BeanDefinitions, managing lifecycle phases via BeanPostProcessors and a three-level singleton cache.',
                    concept: 'During startup, the BeanDefinitionReader parses configurations into BeanDefinition metadata models. The DefaultListableBeanFactory instantiates singletons through reflection or constructor injection, populates properties, invokes Aware interfaces (BeanNameAware, ApplicationContextAware), executes BeanPostProcessor postProcessBeforeInitialization, runs custom @PostConstruct/InitializingBean callbacks, and wraps instances with postProcessAfterInitialization (where AOP proxies are created). The Three-Level Cache (singletonObjects, earlySingletonObjects, and singletonFactories) resolves circular dependencies in setter/field injection, but constructor-injected circular dependencies fail early at runtime because instances cannot be instantiated without their parameters.',
                    syntax: 'import org.springframework.beans.factory.InitializingBean;\nimport org.springframework.stereotype.Component;\nimport jakarta.annotation.PostConstruct;\nimport jakarta.annotation.PreDestroy;\n\n@Component\npublic class ManagedAuditService implements InitializingBean {\n    @PostConstruct\n    public void initAnnotation() { /* Step 1: JSR-250 annotation callback / }\n    \n    @Override\n    public void afterPropertiesSet() { / Step 2: Spring lifecycle callback / }\n    \n    @PreDestroy\n    public void cleanup() { / Teardown callback on shutdown */ }\n}',
                    example: 'import org.springframework.context.annotation.AnnotationConfigApplicationContext;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\n\n@Configuration\nclass AppWiringConfig {\n    record PaymentGateway(String providerUrl) {}\n    \n    @Bean(initMethod = "start")\n    PaymentGateway gateway() {\n        return new PaymentGateway("https://api.gateway.internal");\n    }\n}\n\npublic class IoCLifecycleDemo {\n    public static void main(String[] args) {\n        var context = new AnnotationConfigApplicationContext(AppWiringConfig.class);\n        var gateway = context.getBean(AppWiringConfig.PaymentGateway.class);\n        System.out.println("Resolved Gateway Provider: " + gateway.providerUrl());\n        context.close();\n    }\n}',
                    output: 'Resolved Gateway Provider: https://api.gateway.internal',
                    keyPoints: [
                        'Constructor injection is preferred because it guarantees immutability (final fields) and prevents uninitialized dependencies.',
                        'The Three-Level Cache in DefaultSingletonBeanRegistry uses ObjectFactories in level 3 to expose early references for circular dependency resolution.',
                        'BeanPostProcessors allow interception and wrapping of beans before and after initialization across the entire container.'
                    ],
                    mistakes: [
                        'Using field injection (@Autowired on private fields), which hides dependencies and complicates plain unit tests without starting a full Spring test runner.',
                        'Introducing circular dependencies between constructor-injected components, resulting in an unresolvable BeanCurrentlyInCreationException.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Custom BeanPostProcessor Validation Engine',
                            desc: 'Implement a BeanPostProcessor that inspects all instantiated beans for a custom @EncryptedField annotation and initializes transparent decryptors.'
                        }
                    ]
                },
                {
                    name: 'Spring AOP Internals: Dynamic JDK Proxies vs CGLIB Bytecode Generation',
                    definition: 'Aspect-Oriented Programming (AOP) encapsulates cross-cutting concerns (logging, security, transaction management) by dynamically wrapping target beans in proxy instances.',
                    concept: 'Spring AOP is proxy-based. If a target class implements an interface, Spring historically defaults to standard JDK Dynamic Proxies using java.lang.reflect.Proxy and InvocationHandler. If the target does not implement an interface (or if Spring Boot 2.x/3.x defaults are applied), Spring uses CGLIB (Code Generation Library) via byte-buddy to subclass the target class at runtime. Because method calls must pass through the proxy wrapper to execute advice interceptors, self-invocation calls (calling this.methodB() from methodA() within the same class) bypass the proxy entirely, silently skipping transactional (@Transactional) or cacheable (@Cacheable) behaviors.',
                    syntax: 'import org.aspectj.lang.ProceedingJoinPoint;\nimport org.aspectj.lang.annotation.Around;\nimport org.aspectj.lang.annotation.Aspect;\nimport org.springframework.stereotype.Component;\n\n@Aspect\n@Component\npublic class ExecutionProfilingAspect {\n    @Around("@annotation(org.springframework.web.bind.annotation.GetMapping)")\n    public Object profileExecutionTime(ProceedingJoinPoint pjp) throws Throwable {\n        long start = System.currentTimeMillis();\n        try {\n            return pjp.proceed(); // Delegate to underlying target method\n        } finally {\n            long duration = System.currentTimeMillis() - start;\n            System.out.println(pjp.getSignature().getName() + " executed in " + duration + " ms");\n        }\n    }\n}',
                    example: 'public class ProxySelfInvocationDemo {\n    public interface OrderService {\n        void placeOrder();\n        void chargeCard();\n    }\n\n    public static class OrderServiceImpl implements OrderService {\n        public void placeOrder() {\n            System.out.println("Step 1: Placing Order...");\n            // Internal direct this-call bypasses the dynamic proxy interception!\n            this.chargeCard();\n        }\n\n        public void chargeCard() {\n            System.out.println("Step 2: Processing Payment Transaction...");\n        }\n    }\n\n    public static void main(String[] args) {\n        OrderService target = new OrderServiceImpl();\n        // Dynamic proxy mimicking Spring AOP interceptor pipeline\n        OrderService proxy = (OrderService) java.lang.reflect.Proxy.newProxyInstance(\n            OrderService.class.getClassLoader(),\n            new Class<?>[]{OrderService.class},\n            (p, method, mArgs) -> {\n                System.out.println("[AUDIT LOG] Intercepted call to: " + method.getName());\n                return method.invoke(target, mArgs);\n            }\n        );\n\n        proxy.placeOrder();\n    }\n}',
                    output: '[AUDIT LOG] Intercepted call to: placeOrder\nStep 1: Placing Order...\nStep 2: Processing Payment Transaction...',
                    keyPoints: [
                        'JDK Dynamic Proxies require interface definitions, whereas CGLIB dynamically subclasses concrete classes.',
                        'Self-invocation within the same bean bypasses Spring AOP proxy interceptors; decouple calls into separate beans or use self-injection to route through the proxy.',
                        '@Transactional is powered by AOP: TransactionInterceptor wraps method execution with begin, commit, and rollback logic.'
                    ],
                    mistakes: [
                        'Marking private or final methods with @Transactional or @Async; CGLIB cannot override final methods and Spring proxies ignore non-public methods.',
                        'Expecting transactional rollbacks when calling an internal @Transactional method from an unannotated method within the same service class.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Self-Invocation Bypass Workaround',
                            desc: 'Refactor a service where an unannotated method calls a private @Transactional method so that database rollback behavior executes properly under unchecked exceptions.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 4 Assessment: IoC Lifecycle, Three-Level Cache & Spring AOP Proxies',
                questions: [
                    {
                        question: '1. What problem does the Three-Level Cache in Spring’s DefaultSingletonBeanRegistry resolve?',
                        options: ['Multi-region network latency', 'Circular dependencies between singleton beans using setter or field injection by exposing partially constructed early object references', 'Database query caching', 'Garbage collection memory leaks'],
                        correct: 1,
                        explanation: 'The three-level cache holds completed singletons, early unpopulated references, and singleton factories, resolving circular references when instances do not use constructor injection.'
                    },
                    {
                        question: '2. Why does circular dependency resolution fail when two beans inject each other via constructor injection?',
                        options: ['Java does not allow constructors to be public in Spring', 'Neither bean can complete constructor execution to create an instance pointer that can be placed into the early singleton cache', 'Spring converts constructors into static blocks', 'CGLIB disables constructors'],
                        correct: 1,
                        explanation: 'To store an early reference, the object instance must be allocated first; with circular constructor injection, neither instance can be created, triggering a BeanCurrentlyInCreationException.'
                    },
                    {
                        question: '3. What occurs when a method calls another @Transactional method inside the exact same service class (this.methodB())?',
                        options: ['A nested database transaction is spawned', 'The call executes via the direct object reference (this), bypassing the Spring AOP proxy and skipping transactional interceptor logic', 'The thread deadlocks', 'A MethodNotFoundException is thrown'],
                        correct: 1,
                        explanation: 'Spring AOP relies on proxy wrappers; direct internal method invocations bypass the outer proxy and run directly on the underlying target instance without advice.'
                    },
                    {
                        question: '4. What is the fundamental technical difference between JDK Dynamic Proxies and CGLIB proxies in Spring AOP?',
                        options: ['JDK proxies operate via interfaces using reflection; CGLIB dynamically subclasses the target class at the bytecode level', 'JDK proxies only run on Linux systems', 'CGLIB only works with records', 'JDK proxies require database connections'],
                        correct: 0,
                        explanation: 'JDK Dynamic Proxies require target interfaces to create wrapper implementations, while CGLIB creates a dynamic subclass of the concrete target class.'
                    },
                    {
                        question: '5. Which phase of the Spring bean lifecycle creates and injects AOP proxy wrappers around beans?',
                        options: ['During BeanDefinition parsing', 'In the postProcessAfterInitialization phase of BeanPostProcessor execution', 'Before any constructor is executed', 'During garbage collection'],
                        correct: 1,
                        explanation: 'AbstractAutoProxyCreator (a BeanPostProcessor) intercepts the bean in postProcessAfterInitialization to return an AOP proxy instance if pointcuts match.'
                    },
                    {
                        question: '6. Why can Spring AOP not apply advice to methods marked with the final keyword when using CGLIB proxies?',
                        options: ['Final methods throw security exceptions', 'CGLIB relies on class subclassing and method overriding, which Java syntax explicitly disallows on final methods', 'Final methods are stored in Metaspace', 'Final methods cannot accept arguments'],
                        correct: 1,
                        explanation: 'CGLIB creates a dynamic subclass and overrides non-final target methods; because Java forbids overriding final methods, proxies cannot intercept them.'
                    },
                    {
                        question: '7. What is the recommended execution order for custom initialization methods in a Spring Bean?',
                        options: ['@PreDestroy -> InitializingBean -> Custom init()', 'Constructor -> @PostConstruct -> InitializingBean.afterPropertiesSet() -> Custom init-method', 'init-method -> Constructor -> @PostConstruct', 'InitializingBean -> Constructor'],
                        correct: 1,
                        explanation: 'Spring executes constructors first, followed by JSR-250 @PostConstruct callbacks, then InitializingBean.afterPropertiesSet(), and finally custom XML/configuration init-methods.'
                    },
                    {
                        question: '8. What is the default proxying mechanism in Spring Boot 2.x and 3.x?',
                        options: ['JDK Dynamic Proxies exclusively', 'CGLIB proxies (spring.aop.proxy-target-class=true) by default, regardless of whether interfaces are present', 'AspectJ compile-time weaving only', 'Static reflection generation'],
                        correct: 1,
                        explanation: 'Spring Boot enables class-based CGLIB proxies by default to prevent unexpected ClassCastException issues when injecting concrete classes.'
                    },
                    {
                        question: '9. What does the @Aspect annotation signify in Spring framework architecture?',
                        options: ['A class that handles HTTP REST responses', 'A module encapsulating pointcuts and advice that cross-cut across traditional layered boundaries', 'A database connection pool definition', 'A message queue consumer'],
                        correct: 1,
                        explanation: '@Aspect marks a class containing pointcut definitions and advice interceptors (e.g., @Before, @Around, @AfterThrowing) for cross-cutting concerns.'
                    },
                    {
                        question: '10. What does the ProceedingJoinPoint.proceed() method do within an @Around advice block?',
                        options: ['Terminates the application context', 'Advances the execution chain to invoke the next interceptor or the actual underlying target method', 'Rolls back database transactions', 'Resets CPU instruction counters'],
                        correct: 1,
                        explanation: 'Calling pjp.proceed() invokes the next interceptor in the chain or delegates to the original target method, returning its result.'
                    },
                    {
                        question: '11. Why is constructor injection favored over field injection with @Autowired in modern enterprise architectures?',
                        options: ['Constructor injection runs faster in JVM bytecode', 'It supports immutable dependencies with final fields, guarantees non-null instantiation, and allows easy mocking in standalone unit tests', 'Field injection uses more heap memory', 'Field injection is deprecated in Java 21'],
                        correct: 1,
                        explanation: 'Constructor injection ensures components cannot be instantiated in a half-initialized state, allows dependencies to be final, and avoids reliance on reflection during tests.'
                    },
                    {
                        question: '12. What is a Spring BeanFactoryPostProcessor used for?',
                        options: ['Manipulating bean instances after creation', 'Reading and modifying bean metadata definitions (BeanDefinition) before any bean instances are actually constructed', 'Handling HTTP error codes', 'Managing thread pools'],
                        correct: 1,
                        explanation: 'BeanFactoryPostProcessor (e.g., PropertySourcesPlaceholderConfigurer) modifies the configuration metadata of beans before the container instantiates them.'
                    },
                    {
                        question: '13. What is the scope of a Spring bean declared as @Scope("prototype")?',
                        options: ['Shared globally across the entire ApplicationContext', 'A new, distinct instance is created every time the bean is requested from the container', 'One instance per active HTTP session', 'One instance per thread'],
                        correct: 1,
                        explanation: 'Unlike default singletons, prototype-scoped beans cause the IoC container to create and return a newly instantiated object on every lookup or injection.'
                    },
                    {
                        question: '14. What occurs when a prototype-scoped bean is injected into a singleton-scoped bean without using scoped proxies or Provider lookups?',
                        options: ['A BeanCreationException is thrown', 'The prototype bean is instantiated only once when the singleton bean is constructed, effectively locking it into a singleton lifecycle', 'The singleton bean converts into a prototype bean', 'The application fails to compile'],
                        correct: 1,
                        explanation: 'Because the singleton bean is initialized once at startup, its prototype dependency is injected once and never refreshed unless configured via ObjectProvider or @Lookup.'
                    },
                    {
                        question: '15. What is the role of an AOP "Pointcut" expression in Spring?',
                        options: ['A database connection string', 'A predicate expression that determines which specific join points (methods) match and will have advice applied to them', 'An execution breakpoint in Java debugging', 'A network socket port binding'],
                        correct: 1,
                        explanation: 'Pointcuts define execution matching criteria (e.g., execution(* com.service.*.*(..))) specifying precisely where advice should be woven into application workflows.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-jpa-hibernate-performance',
            title: 'Week 5: Persistence Engineering — JPA, Hibernate Internals & HikariCP',
            topics: [
                {
                    name: 'Persistence Context, Dirty Checking & The Hibernate N+1 Query Trap',
                    definition: 'The JPA EntityManager manages a first-level cache (Persistence Context) that tracks entity lifecycle states (New, Managed, Detached, Removed) and synchronizes mutations to the database via dirty checking.',
                    concept: 'When an entity is loaded, Hibernate retains an internal snapshot of its initial state. During flush(), Hibernate compares the current state against this snapshot (Dirty Checking) and issues optimized SQL UPDATE statements automatically. However, navigating lazy-loaded collections (@OneToMany(fetch = FetchType.LAZY)) across a list of parent entities triggers the infamous N+1 query problem: 1 query fetches $N$ parents, followed by $N$ individual SQL queries to fetch each parent\'s children. This is resolved using JOIN FETCH in JPQL, Entity Graphs (@EntityGraph), or batch fetching (@BatchSize(size = 50)).',
                    syntax: '// Eliminating N+1 via JPQL JOIN FETCH\n@Query("SELECT DISTINCT u FROM User u JOIN FETCH u.orders WHERE u.status = :status")\nList<User> findAllActiveUsersWithOrders(@Param("status") String status);\n\n// Alternative: Declarative JPA EntityGraph\n@EntityGraph(attributePaths = {"orders", "orders.items"})\nList<User> findByStatus(String status);',
                    example: 'import jakarta.persistence.;\nimport java.util.;\n\n@Entity\n@Table(name = "accounts")\npublic class Account {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    private String owner;\n    private double balance;\n\n    // Managed entity: modifying fields directly triggers automated dirty checking\n    public void credit(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException("Invalid credit amount");\n        this.balance += amount;\n    }\n    \n    // Getters and Setters omitted for brevity\n}',
                    output: '// Hibernate generates optimized SQL on transaction commit:\n// UPDATE accounts SET balance = balance + ? WHERE id = ?',
                    keyPoints: [
                        'First-Level Cache is bound to the active transaction/EntityManager; it guarantees reference equality ($a == b$) for entities with identical primary keys.',
                        'Dirty checking eliminates the need to call repository.save() on already managed entities within @Transactional boundaries.',
                        'Avoid FetchType.EAGER on collection associations; it frequently leads to uncontrollable Cartesian product queries and subselect explosions.'
                    ],
                    mistakes: [
                        'Calling repository.save() inside a @Transactional loop on managed entities, causing redundant persistence context lookups and misleading code intentions.',
                        'Using pagination (Pageable) combined with JOIN FETCH on @OneToMany relationships, forcing Hibernate to log a warning and execute in-memory pagination on the JVM heap.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'BatchSize Subselect Remediation',
                            desc: 'Configure @BatchSize(size = 30) on a nested parent-child-grandchild relationship and verify using SQL logs that queries collapse from $1 + N$ to $1 + \\lceil N/30 \\rceil$.'
                        }
                    ]
                },
                {
                    name: 'High-Performance Connection Pooling: HikariCP Internals & Transaction Isolation',
                    definition: 'HikariCP is a zero-overhead, highly optimized JDBC connection pool utilizing bytecode-engineered delegates and lock-free thread-local caching to minimize latency.',
                    concept: 'Opening and closing physical database TCP sockets and TLS handshakes is computationally expensive. Connection pools maintain an active pool of open connections. HikariCP outperforms older pools (C3P0, DBCP) by using FastList (an array list that avoids range checks and removes items from the tail in $O(1)$) and ConcurrentBag (a lock-free borrowing structure using ThreadLocal caches). Correct transaction isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE) protect against dirty reads, non-repeatable reads, and phantom reads while balancing database concurrency throughput.',
                    syntax: '# application.yml HikariCP production configuration\nspring:\n  datasource:\n    hikari:\n      maximum-pool-size: 20\n      minimum-idle: 10\n      idle-timeout: 300000\n      connection-timeout: 20000\n      max-lifetime: 1800000\n      leak-detection-threshold: 5000',
                    example: 'import com.zaxxer.hikari.HikariConfig;\nimport com.zaxxer.hikari.HikariDataSource;\nimport java.sql.Connection;\nimport java.sql.PreparedStatement;\nimport java.sql.ResultSet;\n\npublic class HikariPoolDemo {\n    public static void main(String[] args) throws Exception {\n        HikariConfig config = new HikariConfig();\n        config.setJdbcUrl("jdbc:h2:mem:auradb;DB_CLOSE_DELAY=-1");\n        config.setUsername("sa");\n        config.setPassword("");\n        config.setMaximumPoolSize(5);\n\n        try (HikariDataSource ds = new HikariDataSource(config);\n             Connection conn = ds.getConnection();\n             PreparedStatement ps = conn.prepareStatement("SELECT 1");\n             ResultSet rs = ps.executeQuery()) {\n            if (rs.next()) {\n                System.out.println("Connection borrowed & query executed: " + rs.getInt(1));\n            }\n        } // Connection automatically returns to pool via AutoCloseable\n    }\n}',
                    output: 'Connection borrowed & query executed: 1',
                    keyPoints: [
                        'Formula for optimal connection pool size: $Connections = (CoreCount \\times 2) + EffectiveSpindleCount$. Excessive connections degrade throughput due to OS disk and CPU contention.',
                        'The leak-detection-threshold identifies unclosed connections that fail to return to the pool within a configured time limit.',
                        'Closing a borrowed connection (conn.close()) does not disconnect the socket; it returns the connection back to the Hikari pool.'
                    ],
                    mistakes: [
                        'Setting maximum-pool-size to excessively high numbers (e.g., 200), overwhelming database memory and causing thread thrashing on Postgres/MySQL.',
                        'Holding database transactions open while executing slow third-party external HTTP network calls, exhausting the pool and causing cascading outages.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Simulating Connection Leak Detection',
                            desc: 'Configure a leak-detection-threshold of 2000ms, borrow a connection without closing it inside a long-running thread, and inspect the logged leak alert stack trace.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 5 Assessment: JPA Entity Lifecycle, N+1 Query Resolution & HikariCP',
                questions: [
                    {
                        question: '1. What causes the Hibernate N+1 query problem during relational database access?',
                        options: ['Database index corruption', 'Executing 1 query to retrieve $N$ parent records, followed by $N$ sequential individual queries to load child associations when accessed lazily in code', 'Having more than N tables in a schema', 'Running more than 1 database transaction concurrently'],
                        correct: 1,
                        explanation: 'The N+1 problem occurs when an application fetches $N$ entities and then lazily fetches a related child collection for each entity in an iteration loop, causing $N$ additional query executions.'
                    },
                    {
                        question: '2. How does using JOIN FETCH in a JPQL query resolve the N+1 query problem?',
                        options: ['It disables database transactions', 'It instructs the persistence provider to fetch the parent entities and their associated child entities together in a single SQL JOIN query', 'It caches the entities on local hard drives', 'It converts foreign keys to integers'],
                        correct: 1,
                        explanation: 'JOIN FETCH forces Hibernate to perform an inner or left join in the initial query, eagerly loading parent and associated child entities in a single database round-trip.'
                    },
                    {
                        question: '3. What mechanism allows Hibernate to automatically persist state changes without explicitly invoking repository.save()?',
                        options: ['Operating system file monitors', 'Dirty Checking: the persistence context compares the current entity state against its loading snapshot during flush time and issues SQL UPDATEs', 'Background cron triggers', 'AOP method interception on getters'],
                        correct: 1,
                        explanation: 'During transaction flush, Hibernate compares the entity\'s current field values against the original snapshot stored in the first-level cache, generating SQL updates for detected changes.'
                    },
                    {
                        question: '4. Why does combining JOIN FETCH on @OneToMany collections with Pageable limits cause performance problems in Spring Data JPA?',
                        options: ['It throws an immediate SQLException', 'Hibernate cannot apply SQL LIMIT and OFFSET clauses safely with duplicate parent rows, falling back to loading the entire result set into JVM memory to paginate in-memory', 'Pagination requires MongoDB', 'The database connection closes prematurely'],
                        correct: 1,
                        explanation: 'Because joining a 1:N collection duplicates parent rows in SQL result sets, database-level limits truncate children; Hibernate logs HHH000104 and executes pagination in JVM heap memory.'
                    },
                    {
                        question: '5. What is the scope of the JPA First-Level Cache?',
                        options: ['Shared globally across all JVM processes', 'Bound to the active EntityManager / transactional session', 'Shared across all tenants in a multi-tenant cluster', 'Persisted across application restarts'],
                        correct: 1,
                        explanation: 'The first-level cache lives strictly within the lifecycle of the active EntityManager (or current transaction) and is discarded once the session closes.'
                    },
                    {
                        question: '6. What data structure innovation makes HikariCP faster than legacy connection pools (DBCP, C3P0)?',
                        options: ['It replaces JDBC with raw sockets', 'It uses FastList to eliminate boundary checks and ConcurrentBag with lock-free ThreadLocal caching to borrow connections without global contention', 'It relies exclusively on Java reflection', 'It stores connections in Redis'],
                        correct: 1,
                        explanation: 'HikariCP utilizes ConcurrentBag to provide lock-free handoffs and thread-local connection tracking, alongside a specialized FastList to speed up list operations.'
                    },
                    {
                        question: '7. What occurs when a borrowed Hikari connection is closed via connection.close() in standard application code?',
                        options: ['The underlying TCP socket connection to the database server is terminated', 'The connection wrapper resets its state and returns itself to the active pool to be reused by other threads', 'The database drops the active schema', 'The connection is permanently locked'],
                        correct: 1,
                        explanation: 'Hikari provides a proxy wrapper over the physical JDBC connection; calling .close() returns the connection to the pool rather than severing the underlying socket.'
                    },
                    {
                        question: '8. What does the leak-detection-threshold setting in HikariCP monitor?',
                        options: ['Memory leaks in Java Metaspace', 'Logs a warning with a stack trace if a borrowed connection remains checked out from the pool longer than the specified time without being closed', 'SQL injection attempts in queries', 'Bandwidth leaks on the network interface'],
                        correct: 1,
                        explanation: 'leak-detection-threshold flags connections that are checked out of the pool for longer than expected, helping locate code paths that leak database connections.'
                    },
                    {
                        question: '9. What is a "Phantom Read" in database transaction isolation levels?',
                        options: ['Reading corrupted data from disk', 'A transaction re-runs a search query using a range predicate and discovers newly inserted rows committed by another concurrent transaction', 'Reading a row that has been updated but not committed', 'A query reading data from a closed connection'],
                        correct: 1,
                        explanation: 'A phantom read occurs when a transaction queries a range of rows twice and finds that another committed transaction has inserted or removed rows satisfying the condition.'
                    },
                    {
                        question: '10. What does the @Modifying annotation signify when paired with @Query in Spring Data JPA?',
                        options: ['It enables AOP tracing', 'It indicates the query executes an INSERT, UPDATE, or DELETE statement rather than a SELECT statement, managing EntityManager clearing if specified', 'It makes the query run in read-only mode', 'It encrypts database parameters'],
                        correct: 1,
                        explanation: '@Modifying informs Spring Data that the query mutates database state, ensuring proper execution via executeUpdate() and coordinating with the persistence context.'
                    },
                    {
                        question: '11. Why should you avoid executing slow external HTTP calls within an active @Transactional database method?',
                        options: ['HTTP calls are blocked by database firewalls', 'The thread holds a borrowed database connection from the pool throughout the HTTP wait time, increasing pool exhaustion risks and degrading application concurrency', 'JPA throws an UnsupportedOperationException', 'It invalidates the entity first-level cache'],
                        correct: 1,
                        explanation: 'Database connections are a scarce resource. Tying connection hold times to variable third-party network latencies can rapidly deplete connection pools.'
                    },
                    {
                        question: '12. What state does a JPA entity enter after its owning EntityManager is closed or after calling em.detach(entity)?',
                        options: ['Managed', 'Detached', 'Transient (New)', 'Removed'],
                        correct: 1,
                        explanation: 'A detached entity has an established database identity (primary key) but is no longer tracked by an active persistence context; modifications will not be dirty-checked.'
                    },
                    {
                        question: '13. What problem does setting @BatchSize(size = 50) on an association solve?',
                        options: ['It limits database insert size to 50 rows total', 'It batches lazy loading queries using SQL IN predicates (e.g., WHERE parent_id IN (?, ?, ...)), reducing sequential queries', 'It restricts table size to 50 columns', 'It enforces 50 connection threads in HikariCP'],
                        correct: 1,
                        explanation: '@BatchSize tells Hibernate to load lazy associations for up to the configured number of parent entities in a single query using an IN clause, mitigating N+1 query patterns.'
                    },
                    {
                        question: '14. What is the formula recommended by the PostgreSQL/HikariCP engineering teams for sizing connection pools?',
                        options: ['Pool Size = Number of active users * 10', 'Pool Size = (CPU cores * 2) + Effective spindle/disk count', 'Pool Size = JVM Max Heap (GB) * 5', 'Pool Size = Total database tables * 2'],
                        correct: 1,
                        explanation: 'Empirical testing shows that optimal pool sizes follow (CoreCount * 2) + Spindles; larger pools cause performance degradation due to CPU scheduling and disk I/O context switching.'
                    },
                    {
                        question: '15. What is the default transaction isolation level for most enterprise relational databases like PostgreSQL and Oracle?',
                        options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
                        correct: 1,
                        explanation: 'READ COMMITTED is the default isolation level for PostgreSQL, Oracle, and SQL Server, preventing dirty reads while supporting high concurrent transaction throughput.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-springboot3-internals-graalvm',
            title: 'Week 6: Spring Boot 3 Internals, Custom Starters & GraalVM Native Images',
            topics: [
                {
                    name: 'Auto-Configuration Mechanics: @Conditional, Imports & Custom Starters',
                    definition: 'Spring Boot Auto-Configuration infers bean definitions and environment wiring automatically based on classpath contents, active profiles, and declared property configurations.',
                    concept: 'At boot time, @EnableAutoConfiguration scans META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Each candidate configuration class uses conditional metadata annotations (such as @ConditionalOnClass, @ConditionalOnMissingBean, and @ConditionalOnProperty) to decide whether to activate. Custom Starters package these configurations into modular, opinionated libraries. Using @ConditionalOnMissingBean ensures framework-provided defaults yield gracefully whenever a consuming application defines its own explicit bean overrides.',
                    syntax: '// Custom auto-configuration class with condition guards\n@AutoConfiguration\n@ConditionalOnClass(AuditClient.class)\n@EnableConfigurationProperties(AuditProperties.class)\npublic class AuditAutoConfiguration {\n    \n    @Bean\n    @ConditionalOnMissingBean\n    public AuditClient defaultAuditClient(AuditProperties props) {\n        return new HttpAuditClient(props.getEndpointUrl(), props.getApiKey());\n    }\n}',
                    example: 'import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\n\npublic class StarterDemo {\n    public interface NotificationService {\n        String send(String msg);\n    }\n\n    public static class DefaultEmailNotification implements NotificationService {\n        public String send(String msg) { return "Default Email Sent: " + msg; }\n    }\n\n    public static class CustomSmsNotification implements NotificationService {\n        public String send(String msg) { return "Custom SMS Sent: " + msg; }\n    }\n\n    @Configuration\n    public static class AutoConfigSimulation {\n        @Bean\n        @ConditionalOnMissingBean(NotificationService.class)\n        public NotificationService notificationService() {\n            return new DefaultEmailNotification();\n        }\n    }\n\n    public static void main(String[] args) {\n        // Simulating condition: custom bean defined overrides default fallback\n        NotificationService activeService = new CustomSmsNotification();\n        System.out.println(activeService.send("Your verification OTP is 492011"));\n    }\n}',
                    output: 'Custom SMS Sent: Your verification OTP is 492011',
                    keyPoints: [
                        'Spring Boot 3 loads auto-configurations from META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports, deprecating the older spring.factories approach.',
                        '@ConditionalOnMissingBean is key to starter design: it provides sensible defaults that developers can override with a single @Bean definition.',
                        'Conditional evaluation order matters: use @AutoConfigureBefore or @AutoConfigureAfter to sequence dependent auto-configuration classes.'
                    ],
                    mistakes: [
                        'Placing @Configuration classes intended for auto-configuration in the root package of a starter where standard @ComponentScan picks them up eagerly, bypassing conditional evaluation.',
                        'Hardcoding configuration properties instead of binding them type-safely via @ConfigurationProperties and generating metadata with spring-boot-configuration-processor.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Building a Production Rate-Limiting Starter',
                            desc: 'Design an end-to-end custom Spring Boot starter that registers an interceptor enforcing token-bucket rate limits when rate.limiter.enabled=true is set.'
                        }
                    ]
                },
                {
                    name: 'Production Observability: Micrometer, Actuator & GraalVM Ahead-Of-Time (AOT)',
                    definition: 'Spring Boot 3 integrates Micrometer for unified metrics and distributed tracing, paired with GraalVM Native AOT compilation to produce lightweight, instant-starting standalone binaries.',
                    concept: 'Spring Actuator exposes operational endpoints (/actuator/health, /actuator/metrics, /actuator/prometheus) via Micrometer facade abstractions. In traditional JVM mode, dynamic classloading, reflection, and JIT warmup increase startup times (~2-8 seconds). Spring Boot 3 supports GraalVM Native AOT (Ahead-of-Time) compilation: during build time, an AOT processing engine evaluates configurations, discovers reflection hints, and eliminates unused code (dead-code elimination) to compile bytecode directly into an OS-native executable. This yields sub-50ms startup times and tiny runtime memory footprints (~30-60MB RSS), making it ideal for scale-to-zero serverless deployments.',
                    syntax: '// Native reflection hint registration for GraalVM AOT\n@Configuration\npublic class NativeRuntimeHints implements RuntimeHintsRegistrar {\n    @Override\n    public void registerHints(RuntimeHints hints, ClassLoader classLoader) {\n        // Register types that use reflection or dynamic proxies at runtime\n        hints.reflection().registerType(PaymentPayload.class, MemberCategory.INVOKE_DECLARED_CONSTRUCTORS);\n    }\n}',
                    example: 'import io.micrometer.core.instrument.Counter;\nimport io.micrometer.core.instrument.simple.SimpleMeterRegistry;\n\npublic class MetricsDemo {\n    public static void main(String[] args) {\n        SimpleMeterRegistry registry = new SimpleMeterRegistry();\n        \n        // Dimensional metric counter with tags\n        Counter orderCounter = Counter.builder("business.orders.created")\n            .tag("tier", "enterprise")\n            .tag("region", "ap-south-1")\n            .description("Total number of processed enterprise orders")\n            .register(registry);\n            \n        orderCounter.increment();\n        orderCounter.increment(4.0);\n        \n        System.out.println("Metric Name: " + orderCounter.getId().getName());\n        System.out.println("Total Orders Counted: " + orderCounter.count());\n    }\n}',
                    output: 'Metric Name: business.orders.created\nTotal Orders Counted: 5.0',
                    keyPoints: [
                        'Micrometer provides vendor-neutral metric instrumentation (Prometheus, Datadog, Influx) via dimensionality tags.',
                        'GraalVM Native Images require closed-world assumptions: all reflective classes, serialization schemes, and JNI handles must be declared ahead of time.',
                        'Native compilation eliminates JIT optimization warmup periods, running at peak performance from the very first request.'
                    ],
                    mistakes: [
                        'Exposing dangerous Actuator endpoints (e.g., /actuator/env, /actuator/heapdump, /actuator/shutdown) over public networks without Spring Security protection.',
                        'Relying on dynamic runtime reflection or runtime bytecode generation (like dynamic CGLIB proxies) inside GraalVM without providing explicit native runtime hints.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Custom Micrometer Timer and Prometheus Scraping',
                            desc: 'Implement a Micrometer Timer.Sample around an asynchronous order-processing method and expose the distribution summary via the /actuator/prometheus endpoint.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 6 Assessment: Auto-Configuration, Starters, Micrometer & GraalVM AOT',
                questions: [
                    {
                        question: '1. Where must auto-configuration candidate classes be registered in Spring Boot 3 to be recognized by @EnableAutoConfiguration?',
                        options: ['In src/main/resources/application.properties', 'In META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports', 'In META-INF/spring.factories under EnableAutoConfiguration', 'Directly in the OS environment variables'],
                        correct: 1,
                        explanation: 'Spring Boot 3 replaced the legacy spring.factories mechanism with the cleaner META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports file.'
                    },
                    {
                        question: '2. What is the primary role of the @ConditionalOnMissingBean annotation when authoring a custom Spring Boot starter?',
                        options: ['Throws an exception if a bean is missing', 'Provides a fallback default bean that is created only if the consuming application has not already declared its own bean of that type', 'Deletes beans from ApplicationContext', 'Forces beans to be prototype-scoped'],
                        correct: 1,
                        explanation: '@ConditionalOnMissingBean allows starters to supply default configurations while giving developers the freedom to override them by declaring their own beans.'
                    },
                    {
                        question: '3. What closed-world assumption does GraalVM Ahead-Of-Time (AOT) compilation enforce during native binary generation?',
                        options: ['The machine cannot connect to the internet', 'All bytecode, reachable classes, dynamic reflection paths, and resources must be discoverable and analyzed during build time', 'Database tables must be empty', 'Only one thread can execute'],
                        correct: 1,
                        explanation: 'The closed-world assumption means GraalVM inspects and compiles only the reachable code paths at build time, requiring explicit runtime hints for dynamically reflected classes.'
                    },
                    {
                        question: '4. What are the key operational benefits of compiling a Spring Boot 3 microservice into a GraalVM Native Image?',
                        options: ['Larger disk executable sizes and slower compilation', 'Near-instantaneous startup times (sub-50ms) and substantially lower baseline memory footprints (RSS)', 'Automatic migration of SQL databases to NoSQL', 'Elimination of all unit tests'],
                        correct: 1,
                        explanation: 'GraalVM Native Images strip unused bytecode and bypass JVM classloading and JIT warmup, achieving sub-second startups and minimal memory overhead.'
                    },
                    {
                        question: '5. Which Micrometer meter type is best suited for recording short-lived task durations and their execution frequencies?',
                        options: ['Gauge', 'Counter', 'Timer', 'DistributionSummary'],
                        correct: 2,
                        explanation: 'Timer records both total duration and call counts simultaneously, publishing metrics like throughput, mean duration, and percentile histograms.'
                    },
                    {
                        question: '6. What does a Micrometer Gauge measure in comparison to a Counter?',
                        options: ['Monotonically increasing cumulative values', 'The current instantaneous snapshot value of an observed state variable (e.g., active thread count, collection size)', 'Network packet checksums', 'Total database rows permanently created'],
                        correct: 1,
                        explanation: 'While counters only go up (or reset to zero), gauges measure variable values that fluctuate up and down, such as current queue size or memory usage.'
                    },
                    {
                        question: '7. What security risk is introduced by exposing the /actuator/env endpoint publicly without authorization?',
                        options: ['It drains system battery power', 'It leaks sensitive environment variables, database credentials, API keys, and internal property values to unauthorized clients', 'It slows down disk read speeds', 'It shuts down the web server'],
                        correct: 1,
                        explanation: 'The /actuator/env endpoint reveals active configuration properties and environment variables, which can expose secrets if left unauthenticated.'
                    },
                    {
                        question: '8. How does @ConfigurationProperties differ from using individual @Value annotations in Spring Boot?',
                        options: ['@ConfigurationProperties only accepts integers', '@ConfigurationProperties offers type-safe, hierarchical binding with JSR-380 validation, relaxed property binding, and structured IDE autocompletion support', '@Value runs faster at compile time', '@ConfigurationProperties disables caching'],
                        correct: 1,
                        explanation: '@ConfigurationProperties groups configuration into strongly typed beans with relaxed binding rules (camelCase, kebab-case) and supports validation via @Validated.'
                    },
                    {
                        question: '9. What is the role of RuntimeHintsRegistrar in a Spring Boot 3 native image application?',
                        options: ['To configure compiler flags in Maven/Gradle', 'To programmatically register reflection, serialization, proxy, or resource hints needed by GraalVM that cannot be deduced through static analysis', 'To log debug messages at runtime', 'To configure connection pool limits'],
                        correct: 1,
                        explanation: 'When GraalVM cannot detect reflection or dynamic proxies through static code analysis, RuntimeHintsRegistrar provides the necessary hints explicitly.'
                    },
                    {
                        question: '10. What does the @ConditionalOnProperty(name="feature.flag", havingValue="true", matchIfMissing=false) annotation do?',
                        options: ['Loads the bean unconditionally', 'Instantiates the annotated bean only if feature.flag is explicitly set to "true" in the environment or configuration files', 'Throws an error if the property is missing', 'Renames the property in memory'],
                        correct: 1,
                        explanation: 'The condition activates only when feature.flag equals "true"; if the property is missing from configuration, the bean is skipped because matchIfMissing=false.'
                    },
                    {
                        question: '11. Which Actuator endpoint exposes application health readiness and liveness probes designed for Kubernetes container orchestration?',
                        options: ['/actuator/info', '/actuator/health/readiness and /actuator/health/liveness', '/actuator/beans', '/actuator/conditions'],
                        correct: 1,
                        explanation: 'Kubernetes uses liveness probes to check if the container needs a restart and readiness probes to determine if it can accept incoming traffic.'
                    },
                    {
                        question: '12. Why are dynamic proxies generated at runtime via CGLIB problematic in standard GraalVM native images without pre-configuration?',
                        options: ['They use too many network sockets', 'GraalVM disables runtime bytecode generation under the closed-world assumption unless explicit proxy hints are registered during compilation', 'CGLIB requires 32-bit hardware', 'CGLIB only works with XML configuration'],
                        correct: 1,
                        explanation: 'Generating new bytecode classes on the fly at runtime is disallowed in GraalVM native binaries; all dynamic proxy interfaces must be declared ahead of time.'
                    },
                    {
                        question: '13. What is the purpose of the spring-boot-configuration-processor dependency during project compilation?',
                        options: ['It compiles Java into C++', 'It generates JSON metadata files (additional-spring-configuration-metadata.json) enabling IDE autocompletion and documentation for custom @ConfigurationProperties', 'It encrypts production passwords', 'It speeds up garbage collection'],
                        correct: 1,
                        explanation: 'The configuration processor inspects @ConfigurationProperties classes and generates metadata so IDEs can provide autocomplete, tooltips, and type validation in YAML/properties files.'
                    },
                    {
                        question: '14. What happens when multiple auto-configurations have conflicting dependency requirements?',
                        options: ['The JVM terminates immediately', 'Ordering annotations like @AutoConfigureBefore, @AutoConfigureAfter, or @AutoConfigureOrder must be used to sequence them deterministically', 'The first one alphabetically wins silently', 'All auto-configurations are disabled'],
                        correct: 1,
                        explanation: 'Explicit ordering annotations control the evaluation sequence when auto-configurations depend on beans created by one another.'
                    },
                    {
                        question: '15. Which Micrometer component enables distributed tracing by propagating correlation IDs (traceId and spanId) across HTTP request headers?',
                        options: ['Micrometer Tracing (with OpenTelemetry or Brave bridges)', 'Micrometer Counter', 'Actuator HealthIndicator', 'GraalVM AOT Engine'],
                        correct: 0,
                        explanation: 'Micrometer Tracing provides a unified API for distributed tracing, injecting and extracting trace and span IDs across HTTP headers via OpenTelemetry or Brave engines.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-kafka-event-driven',
            title: 'Week 7: Enterprise Messaging & Event-Driven Architecture with Apache Kafka',
            topics: [
                {
                    name: 'Kafka Storage Internals: Commit Log, Partitions, Offsets & Consumer Groups',
                    definition: 'Apache Kafka is a distributed, append-only commit log storage system partitioned across broker clusters for ordered, horizontally scalable event streaming.',
                    concept: 'Topics are horizontally split into ordered, immutable sequences of records called Partitions. Brokers write messages sequentially to append-only disk segments using OS page-cache memory mappings and zero-copy transfer (sendfile), achieving high I/O throughput. Consumers organize into Consumer Groups: each partition is assigned to exactly one consumer instance within a group at any given time. If consumers exceed partition counts, excess consumer threads sit idle. Rebalances dynamically reassign partition ownership when group members join, crash, or fail to send heartbeats within session.timeout.ms.',
                    syntax: '// Spring Kafka declarative consumer listener\n@KafkaListener(\n    topics = "order-events",\n    groupId = "inventory-service-group",\n    concurrency = "3",\n    containerFactory = "kafkaListenerContainerFactory"\n)\npublic void handleOrderEvent(@Payload OrderEvent event, @Header(KafkaHeaders.RECEIVED_PARTITION) int partition) {\n    // Process partition event\n}',
                    example: 'import org.apache.kafka.clients.producer.*;\nimport java.util.Properties;\n\npublic class KafkaProducerDemo {\n    public static void main(String[] args) {\n        Properties props = new Properties();\n        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\n        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");\n        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");\n        props.put(ProducerConfig.ACKS_CONFIG, "all"); // Full ISR replication acknowledgement\n        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true"); // Prevent network duplicate writes\n\n        try (Producer<String, String> producer = new KafkaProducer<>(props)) {\n            // Routing key "customer-104" guarantees all related events route to the same partition (ordering)\n            ProducerRecord<String, String> record = new ProducerRecord<>("orders", "customer-104", "{\"orderId\":\"ORD-11\",\"total\":299.0}");\n            producer.send(record, (metadata, exception) -> {\n                if (exception == null) {\n                    System.out.println("Published to partition: " + metadata.partition() + " at offset: " + metadata.offset());\n                }\n            });\n        }\n    }\n}',
                    output: 'Published to partition: 2 at offset: 1042',
                    keyPoints: [
                        'Kafka preserves strict message ordering ONLY within an individual partition, never globally across different partitions.',
                        'Using a non-null message key hashes records to deterministic partitions via MurmurHash2 (hash(key) % numPartitions).',
                        'The Linux sendfile system call transfers data directly from the OS page cache to network sockets via DMA (Direct Memory Access), bypassing JVM user space.'
                    ],
                    mistakes: [
                        'Increasing consumer instances beyond topic partition counts, resulting in idle consumers that consume zero records.',
                        'Performing slow, blocking operations inside consumer threads exceeding max.poll.interval.ms, causing the broker coordinator to consider the consumer dead and trigger cascading rebalance storms.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Custom Consistent Partition Router',
                            desc: 'Implement a custom org.apache.kafka.clients.producer.Partitioner routing VIP customer events to dedicated reserved high-priority partitions.'
                        }
                    ]
                },
                {
                    name: 'Delivery Guarantees: At-Least-Once, Idempotent Producers & Exactly-Once Semantics (EOS)',
                    definition: 'Delivery semantics govern message durability across network timeouts and broker failures, spanning At-Most-Once, At-Least-Once, and transactional Exactly-Once Semantics (EOS).',
                    concept: 'Default configurations risk duplicate records during network disconnections: if a broker saves a message but its ACK drops, the producer retries. Idempotent producers (enable.idempotence=true) fix this by tagging batches with a unique Producer ID (PID) and monotonically increasing Sequence Numbers, enabling brokers to discard duplicate retries transparently. Exactly-Once Semantics (EOS) pairs idempotent producers with a two-phase transactional coordinator (transactional.id), writing atomic commit markers across input offsets and output topic partitions via the Consume-Transform-Produce pattern.',
                    syntax: '// Spring transactional Kafka producer configuration\n@Bean\npublic KafkaTransactionManager<String, Object> kafkaTransactionManager(\n    ProducerFactory<String, Object> producerFactory\n) {\n    return new KafkaTransactionManager<>(producerFactory);\n}\n\n@Transactional("kafkaTransactionManager")\npublic void processAndForward(IncomingEvent event) {\n    kafkaTemplate.send("processed-events", event.id(), event.payload());\n}',
                    example: 'import org.apache.kafka.clients.producer.*;\nimport java.util.Properties;\n\npublic class TransactionalProducerDemo {\n    public static void main(String[] args) {\n        Properties props = new Properties();\n        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\n        props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "tx-order-processor-1");\n        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");\n        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");\n\n        Producer<String, String> producer = new KafkaProducer<>(props);\n        producer.initTransactions();\n        \n        try {\n            producer.beginTransaction();\n            producer.send(new ProducerRecord<>("payments", "TX_101", "PAID"));\n            producer.send(new ProducerRecord<>("analytics", "TX_101", "RECORDED"));\n            producer.commitTransaction();\n            System.out.println("Atomic two-topic transaction committed successfully");\n        } catch (ProducerFencedException | OutOfOrderSequenceException e) {\n            producer.close();\n        } catch (KafkaException e) {\n            producer.abortTransaction();\n            System.out.println("Transaction rolled back cleanly");\n        }\n    }\n}',
                    output: 'Atomic two-topic transaction committed successfully',
                    keyPoints: [
                        'Setting acks=all (or -1) requires write confirmations from all In-Sync Replicas (ISR) before acknowledging the producer.',
                        'Transactional Kafka requires downstream consumers to configure isolation.level=read_committed to filter out uncommitted and aborted message batches.',
                        'The Outbox Pattern bridges database transaction commits and Kafka event publishing, avoiding dual-write inconsistencies.'
                    ],
                    mistakes: [
                        'Using EOS on producers while leaving consumer isolation.level set to default read_uncommitted, exposing consumers to dirty, aborted transaction messages.',
                        'Relying on auto-commit (enable.auto.commit=true) with asynchronous business processing, which can commit offsets before operations finish and lead to data loss during crashes.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Transactional Outbox Pipeline with Debezium',
                            desc: 'Design an event publishing architecture that writes entity state and an outbox record in a single database transaction, using Debezium CDC to publish messages reliably to Kafka.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 7 Assessment: Kafka Partitions, Consumer Groups & Exactly-Once Semantics',
                questions: [
                    {
                        question: '1. What scope of message ordering does Apache Kafka guarantee?',
                        options: ['Global total ordering across all topics', 'Strict ordering only within an individual partition', 'Ordering only for uncompressed messages', 'Alphabetical ordering across message keys'],
                        correct: 1,
                        explanation: 'Kafka guarantees total order within a single partition via sequential log offsets; ordering across different partitions is not guaranteed.'
                    },
                    {
                        question: '2. What happens if a consumer group with 6 consumer instances subscribes to a topic that has only 4 partitions?',
                        options: ['Each partition is read by two consumers simultaneously', '4 consumers are assigned 1 partition each, while the remaining 2 consumers sit idle with no partitions assigned', 'The topic automatically creates 2 new partitions', 'The broker throws a PartitionOverflowException'],
                        correct: 1,
                        explanation: 'Within a consumer group, a partition can be assigned to only one consumer at a time; extra consumers stay idle as hot standby instances.'
                    },
                    {
                        question: '3. How does Kafka leverage the Linux sendfile system call to achieve high data throughput?',
                        options: ['It compresses messages using hardware gzip accelerators', 'It transfers data directly from the OS page cache to the network socket descriptor via DMA, eliminating user-space memory copies', 'It writes directly to motherboard flash ROM', 'It bypasses the Linux kernel entirely'],
                        correct: 1,
                        explanation: 'The zero-copy sendfile optimization transfers page cache data directly to the network buffer via Direct Memory Access without copying bytes into the JVM application heap.'
                    },
                    {
                        question: '4. What does the producer configuration setting acks=all (or -1) require before considering a write successful?',
                        options: ['Only the active partition leader must write the message locally', 'The partition leader and all current In-Sync Replicas (ISR) must acknowledge writing the record to their local logs', 'Every broker in the entire cluster must acknowledge the write', 'No acknowledgement is required'],
                        correct: 1,
                        explanation: 'acks=all ensures the leader waits until all replicas in the In-Sync Replica (ISR) set confirm receipt, providing the highest durability against leader failover.'
                    },
                    {
                        question: '5. What mechanism prevents duplicate records when enable.idempotence=true is enabled on a Kafka producer?',
                        options: ['The broker computes SHA-256 hashes of payloads', 'The broker tracks Producer IDs (PID) along with monotonically increasing sequence numbers per partition, transparently ignoring duplicate retry attempts', 'The producer drops retries', 'A distributed Redis cache checks keys'],
                        correct: 1,
                        explanation: 'Each producer receives a unique 64-bit PID and increments sequence numbers per partition; brokers reject incoming sequence numbers equal to or lower than already committed ones.'
                    },
                    {
                        question: '6. What occurs if a consumer processing logic takes longer than max.poll.interval.ms between consecutive poll() calls?',
                        options: ['The consumer process is paused', 'The consumer group coordinator assumes the consumer thread has failed or locked up, revokes its partition assignments, and triggers a group rebalance', 'The broker automatically extends the timeout', 'The consumer offset resets to zero'],
                        correct: 1,
                        explanation: 'If poll() is not invoked within max.poll.interval.ms, the consumer is deemed stalled; the coordinator evicts it from the group and reallocates its partitions to healthy consumers.'
                    },
                    {
                        question: '7. What consumer configuration is required to prevent reading uncommitted or aborted messages produced within an active Kafka transaction?',
                        options: ['auto.offset.reset=earliest', 'isolation.level=read_committed', 'enable.auto.commit=false', 'group.instance.id=null'],
                        correct: 1,
                        explanation: 'Setting isolation.level=read_committed blocks the consumer from returning transactional messages until their corresponding commit markers are appended to the log.'
                    },
                    {
                        question: '8. How does a producer decide which partition to send a message to if a non-null message key is provided under default partitioning?',
                        options: ['Random round-robin distribution', 'It hashes the key using MurmurHash2 and maps the hash modulo to the available partition count (hash(key) % numPartitions)', 'It sends copies to all partitions simultaneously', 'It routes to the partition with the lowest CPU load'],
                        correct: 1,
                        explanation: 'Default partitioning hashes non-null keys using MurmurHash2, ensuring all messages sharing the exact same key land on the identical partition to maintain sequence.'
                    },
                    {
                        question: '9. What architecture pattern avoids the dual-write risk between local database transaction updates and external Kafka message publishing?',
                        options: ['Circuit Breaker Pattern', 'Transactional Outbox Pattern (coupled with Change Data Capture or polling)', 'Saga Choreography Pattern without logs', 'Bulkhead Isolation Pattern'],
                        correct: 1,
                        explanation: 'The Outbox Pattern saves business records and outbox events in a single atomic database transaction; a separate CDC worker (like Debezium) streams the outbox table to Kafka.'
                    },
                    {
                        question: '10. What does the min.insync.replicas broker configuration guarantee when paired with acks=all?',
                        options: ['The minimum consumer group count', 'The minimum number of replicas that must acknowledge a write for it to succeed; if in-sync replicas drop below this number, the producer rejects writes with NotEnoughReplicasException', 'The minimum disk space percentage', 'The minimum thread count allocated to network processing'],
                        correct: 1,
                        explanation: 'When combined with acks=all, min.insync.replicas enforces a durability floor: if the active ISR count falls below this number, the broker rejects writes rather than risking data loss.'
                    },
                    {
                        question: '11. What is a "Compacted Topic" in Apache Kafka?',
                        options: ['A topic compressed using zip archives', 'A topic where Kafka retains at least the latest record value for each primary message key, deleting older historical records with matching keys during log cleaning', 'A topic that automatically deletes all records older than 24 hours', 'A topic with exactly 1 partition'],
                        correct: 1,
                        explanation: 'Log compaction preserves the latest state for every key within the partition, making compacted topics suitable for maintaining key-value state tables or changelogs.'
                    },
                    {
                        question: '12. What problem can occur if enable.auto.commit=true is used alongside asynchronous worker threads?',
                        options: ['Corrupted broker disk sectors', 'At-least-once failure resulting in data loss: offsets can be committed periodically while background workers are still processing and before an error causes them to crash', 'Partitions are dropped permanently', 'Network connection exhaustion'],
                        correct: 1,
                        explanation: 'Auto-commit advances offsets based on time intervals regardless of whether downstream asynchronous processing succeeded, risking unrecoverable data loss during crashes.'
                    },
                    {
                        question: '13. What is a "Rebalance Storm" in high-scale Apache Kafka consumer clusters?',
                        options: ['A hardware overheating alert across brokers', 'A cascading failure cycle where slow consumer processing triggers repeated partition revivals, rebalance pauses, and processing stalls across the consumer group', 'Rapid deletion and recreation of topics', 'A flood of network SYN packets'],
                        correct: 1,
                        explanation: 'Rebalance storms occur when slow processing triggers timeouts that initiate group rebalances; the rebalance pauses consumption, causing further timeouts in a cascading feedback loop.'
                    },
                    {
                        question: '14. What occurs when a Kafka consumer attempts to read a topic partition but no committed offset is found and auto.offset.reset=earliest?',
                        options: ['The consumer throws an OffsetNotFoundException and terminates', 'The consumer resets its position and begins reading from the oldest available record in the partition log', 'The consumer reads only newly arrived messages starting from that moment', 'The partition log is truncated'],
                        correct: 1,
                        explanation: 'auto.offset.reset=earliest forces the consumer to rewind to the earliest available offset in the partition log when no existing committed offset exists for that group.'
                    },
                    {
                        question: '15. What role does the Kafka Cluster Controller play in modern KRaft (Kafka Raft Metadata) mode without ZooKeeper?',
                        options: ['Manages client TLS authentication certificates', 'Manages cluster state, partition leader elections, and topic metadata consensus via an internal Raft quorum log instead of an external ZooKeeper ensemble', 'Runs load-balancing proxies for HTTP clients', 'Generates synthetic test messages'],
                        correct: 1,
                        explanation: 'KRaft mode replaces external ZooKeeper clusters with a built-in event-driven Raft consensus algorithm where designated controller brokers manage cluster metadata.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-distributed-resilience-gateway',
            title: 'Week 8: Distributed Systems — Resilience4j, Spring Cloud Gateway & Tracing',
            topics: [
                {
                    name: 'Fault Tolerance & Self-Healing: Resilience4j Circuit Breaker, RateLimiter & Bulkhead',
                    definition: 'Fault tolerance patterns prevent cascading failures across distributed microservice topologies by isolating resource exhaustion and short-circuiting calls to failing downstream dependencies.',
                    concept: 'When a downstream microservice experiences latency spikes or network timeouts, upstream threads block, exhausting thread pools and causing cascading outages across the architecture. Resilience4j implements a finite state machine Circuit Breaker with three core states: CLOSED (normal traffic passes), OPEN (calls fail fast immediately with CallNotPermittedException when error/slow-call rates exceed configured thresholds), and HALF_OPEN (a bounded probe volume tests if the downstream dependency has recovered). Bulkheads isolate concurrent execution resources into isolated partitions, while RateLimiters regulate request throughput using token bucket or sliding window algorithms.',
                    syntax: '// Resilience4j declarative annotations on a Spring Service\n@Service\npublic class PaymentClient {\n    @CircuitBreaker(name = "paymentGateway", fallbackMethod = "handlePaymentFallback")\n    @Bulkhead(name = "paymentBulkhead", type = Bulkhead.Type.THREADPOOL)\n    @Retry(name = "paymentRetry")\n    public PaymentResponse processTransaction(PaymentRequest request) {\n        return restClient.post().uri("/v1/charge").body(request).retrieve().body(PaymentResponse.class);\n    }\n\n    // Fallback signature must match original method arguments plus Throwable\n    public PaymentResponse handlePaymentFallback(PaymentRequest request, Throwable ex) {\n        return new PaymentResponse("QUEUED", "Payment queued for asynchronous processing");\n    }\n}',
                    example: 'import io.github.resilience4j.circuitbreaker.CircuitBreaker;\nimport io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;\nimport java.time.Duration;\n\npublic class CircuitBreakerStateDemo {\n    public static void main(String[] args) {\n        CircuitBreakerConfig config = CircuitBreakerConfig.custom()\n            .failureRateThreshold(50.0f) // Trip to OPEN if >= 50% calls fail\n            .slidingWindowSize(4)\n            .waitDurationInOpenState(Duration.ofMillis(1000))\n            .build();\n\n        CircuitBreaker breaker = CircuitBreaker.of("inventoryService", config);\n\n        // Simulate failing downstream service\n        for (int i = 1; i <= 4; i++) {\n            try {\n                breaker.executeSupplier(() -> {\n                    throw new RuntimeException("503 Service Unavailable");\n                });\n            } catch (Exception ignored) {}\n        }\n\n        System.out.println("Circuit Breaker State: " + breaker.getState());\n        \n        // Next call fails fast without invoking downstream network supplier\n        try {\n            breaker.executeSupplier(() -> "Success Payload");\n        } catch (Exception ex) {\n            System.out.println("Caught Short-Circuit: " + ex.getClass().getSimpleName());\n        }\n    }\n}',
                    output: 'Circuit Breaker State: OPEN\nCaught Short-Circuit: CallNotPermittedException',
                    keyPoints: [
                        'Sliding window types can be COUNT_BASED (evaluating last N requests) or TIME_BASED (evaluating calls over the last N seconds).',
                        'Fallback methods must reside in the exact same class and match the original method signature, appending the specific Throwable parameter at the end.',
                        'The Bulkhead pattern limits concurrent requests (via Semaphore or isolated ThreadPool), preventing a single saturated endpoint from exhausting total application server worker threads.'
                    ],
                    mistakes: [
                        'Applying retries to non-idempotent HTTP methods (such as standard POST endpoints without idempotency keys), causing duplicate billing or order creation.',
                        'Setting waitDurationInOpenState to excessively short durations (e.g. 50ms), overwhelming recovering downstream databases with thundering herd traffic during half-open transitions.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Time-Based Sliding Window Circuit Configuration',
                            desc: 'Configure Resilience4j programmatically to evaluate a 60-second time window that transitions to OPEN if slow calls exceeding 1500ms exceed 40% of traffic, testing fallback execution under simulated delays.'
                        }
                    ]
                },
                {
                    name: 'Edge Routing & Observability: Spring Cloud Gateway & OpenTelemetry Distributed Tracing',
                    definition: 'API Gateways centralize ingress cross-cutting concerns (authentication, rate-limiting, dynamic routing) while distributed tracing propagates W3C trace contexts to track distributed transactions.',
                    concept: 'Spring Cloud Gateway is built on non-blocking reactive paradigms (Project Reactor and Netty). Incoming HTTP requests match declarative Route Predicates (path, headers, query params) and pass through a chain of GatewayFilters (pre- and post-filters) before being routed to downstream cluster services. Distributed tracing uses OpenTelemetry standards: each request receives a globally unique traceId, and each service-to-service hop generates a spanId. Micrometer Tracing injects and extracts these IDs across HTTP headers (traceparent), enabling distributed observability platforms (Jaeger, Zipkin, Tempo) to reconstruct end-to-end distributed latency waterfalls.',
                    syntax: '# application.yml Spring Cloud Gateway declarative routing\nspring:\n  cloud:\n    gateway:\n      routes:\n        - id: order-service-route\n          uri: lb://ORDER-SERVICE\n          predicates:\n            - Path=/api/v1/orders/**\n            - Method=GET,POST\n          filters:\n            - StripPrefix=2\n            - AddRequestHeader=X-Gateway-Origin, AuraGateway\n            - name: RequestRateLimiter\n              args:\n                redis-rate-limiter.replenishRate: 10\n                redis-rate-limiter.burstCapacity: 20',
                    example: 'import io.micrometer.tracing.Tracer;\nimport io.micrometer.tracing.Span;\nimport io.micrometer.tracing.simple.SimpleTracer;\n\npublic class TracingContextDemo {\n    public static void main(String[] args) {\n        Tracer tracer = new SimpleTracer();\n        \n        // Start root trace span\n        Span rootSpan = tracer.nextSpan().name("handle-incoming-order").start();\n        try (Tracer.SpanInScope ws = tracer.withSpan(rootSpan)) {\n            System.out.println("TraceId: " + rootSpan.context().traceId());\n            System.out.println("Root SpanId: " + rootSpan.context().spanId());\n            \n            // Child span representing downstream microservice network hop\n            Span childSpan = tracer.nextSpan().name("call-payment-service").start();\n            try (Tracer.SpanInScope cws = tracer.withSpan(childSpan)) {\n                System.out.println("Child SpanId: " + childSpan.context().spanId());\n                System.out.println("Span Hierarchy Verified: " + childSpan.context().traceId().equals(rootSpan.context().traceId()));\n            } finally {\n                childSpan.end();\n            }\n        } finally {\n            rootSpan.end();\n        }\n    }\n}',
                    output: 'TraceId: 10a4f569b978d3e2\nRoot SpanId: 10a4f569b978d3e2\nChild SpanId: 89f41b2a95c041e1\nSpan Hierarchy Verified: true',
                    keyPoints: [
                        'Spring Cloud Gateway runs on Netty and Project Reactor; it must never execute blocking I/O calls (e.g. standard JDBC) directly on its EventLoop threads.',
                        'W3C Trace Context headers (traceparent: 00-{traceId}-{spanId}-{flags}) ensure seamless correlation across heterogeneous programming languages.',
                        'OpenTelemetry decouples distributed telemetry collection from backend visualization targets (Jaeger, Grafana Tempo, Datadog).'
                    ],
                    mistakes: [
                        'Invoking blocking database or REST calls inside a Spring Cloud Gateway GlobalFilter without offloading to a bounded scheduler, causing Netty event loops to stall and freezing gateway throughput.',
                        'Failing to propagate HTTP headers across asynchronous thread boundaries in downstream services, causing broken distributed trace spans in Zipkin/Jaeger.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Reactive Global Auth Filter',
                            desc: 'Implement a non-blocking Spring Cloud Gateway GlobalFilter that validates incoming JWT bearer tokens, checks token claims, mutates downstream request headers with user details, and rejects invalid requests with HTTP 401.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 8 Assessment: Resilience4j, Circuit Breakers, Gateways & Distributed Tracing',
                questions: [
                    {
                        question: '1. What are the three primary states of a Resilience4j Circuit Breaker?',
                        options: ['STARTING, RUNNING, STOPPED', 'CLOSED (healthy traffic), OPEN (fail-fast), HALF_OPEN (probing recovery)', 'ACTIVE, PASSIVE, SHUTDOWN', 'PENDING, COMMITTED, ROLLED_BACK'],
                        correct: 1,
                        explanation: 'The circuit breaker starts in CLOSED (traffic flows); when failures exceed thresholds, it trips to OPEN (fails fast); after a timeout, it enters HALF_OPEN to test if the service has recovered.'
                    },
                    {
                        question: '2. What exception is thrown by Resilience4j immediately when a request is attempted while the Circuit Breaker is in the OPEN state?',
                        options: ['TimeoutException', 'CallNotPermittedException', 'ServiceUnavailableException', 'CircuitBreakerCorruptedException'],
                        correct: 1,
                        explanation: 'When OPEN, the circuit breaker protects the downstream system by failing fast immediately, throwing CallNotPermittedException without executing the network call.'
                    },
                    {
                        question: '3. What architectural failure mode does the Bulkhead pattern prevent in a microservice application?',
                        options: ['SQL injection attacks', 'A single saturated downstream dependency consuming all available application worker threads, exhausting resources and starving unrelated service endpoints', 'Corrupted file uploads', 'Memory leaks in garbage collection'],
                        correct: 1,
                        explanation: 'Named after partitions in ship hulls, the Bulkhead pattern partitions thread pools or semaphores so that failure in one component cannot exhaust the entire container\'s execution resources.'
                    },
                    {
                        question: '4. Why is Spring Cloud Gateway built on Project Reactor and Netty rather than a traditional Servlet container like Tomcat?',
                        options: ['Tomcat cannot parse HTTP headers', 'Netty uses an asynchronous, non-blocking event-loop architecture that handles high concurrent connections with minimal memory and thread overhead', 'Netty runs on edge routers directly', 'Project Reactor converts all Java code to machine binaries'],
                        correct: 1,
                        explanation: 'Spring Cloud Gateway uses reactive non-blocking I/O (Reactor Netty) to handle thousands of concurrent client connections with a small, fixed number of event loop threads.'
                    },
                    {
                        question: '5. In distributed tracing (W3C / OpenTelemetry), what is the difference between a traceId and a spanId?',
                        options: ['traceId tracks memory usage; spanId tracks CPU duration', 'A traceId uniquely identifies the entire end-to-end user request path across all services; a spanId identifies an individual, timed work unit within a specific microservice', 'traceId is used only in SQL; spanId is used in HTTP', 'They are identical and interchangeable numbers'],
                        correct: 1,
                        explanation: 'A traceId remains constant across the entire multi-service transaction journey, while each individual network call, queue hop, or sub-task receives its own distinct spanId.'
                    },
                    {
                        question: '6. What happens if a developer performs a blocking JDBC database call directly inside a Spring Cloud Gateway GlobalFilter?',
                        options: ['The database automatically converts to reactive', 'It blocks the underlying Netty EventLoop thread, drastically degrading gateway throughput and potentially stalling all concurrent requests passing through that loop', 'The gateway throws a CompilationError', 'The JVM terminates immediately'],
                        correct: 1,
                        explanation: 'Netty runs on a small number of EventLoop threads (typically equal to CPU cores). Blocking an event loop halts request processing for all channels managed by that thread.'
                    },
                    {
                        question: '7. How does Resilience4j evaluate failure rates under a COUNT_BASED sliding window of size 100 with a failure threshold of 50%?',
                        options: ['It checks if 50 requests fail over a 24-hour period', 'It evaluates the outcome of the most recent 100 calls in a ring buffer; if 50 or more of them failed, the circuit trips to OPEN', 'It closes the circuit if 50 calls succeed in a row', 'It requires 100 consecutive failures to trip'],
                        correct: 1,
                        explanation: 'A COUNT_BASED sliding window maintains outcomes of the last $N$ calls; if the percentage of failed or slow calls in that buffer meets or exceeds the threshold, the circuit opens.'
                    },
                    {
                        question: '8. What is the standard W3C header used to propagate distributed trace context across HTTP network requests?',
                        options: ['X-B3-TraceId', 'traceparent', 'X-Correlation-Identifier', 'Authorization-Span'],
                        correct: 1,
                        explanation: 'The standard W3C recommendation specifies the traceparent header (format: 00-traceId-spanId-flags) for vendor-neutral cross-service context propagation.'
                    },
                    {
                        question: '9. Why must Retry patterns be applied with caution on HTTP POST requests in distributed microservices?',
                        options: ['POST requests cannot carry headers', 'POST requests are often non-idempotent; retrying on network timeouts without idempotency keys can result in duplicate transactions (e.g. charging a card twice)', 'Retries disable SSL encryption', 'POST requests do not support JSON payloads'],
                        correct: 1,
                        explanation: 'If a network timeout occurs after the server processed a non-idempotent request, an automatic retry resubmits the transaction, causing duplicate operations unless idempotency keys are used.'
                    },
                    {
                        question: '10. What does the Spring Cloud Gateway StripPrefix=1 filter do to an incoming request path /api/orders/102?',
                        options: ['Converts the path to lowercase', 'Removes the first path segment (/api), forwarding /orders/102 to the downstream service', 'Drops the order ID number', 'Replaces the path with /api'],
                        correct: 1,
                        explanation: 'StripPrefix=n strips the first n parts of the URL path before proxying the request to the target destination service.'
                    },
                    {
                        question: '11. What is the purpose of the HALF_OPEN state in the Circuit Breaker pattern?',
                        options: ['To route 50% of traffic to a backup database', 'To allow a configurable, limited number of probe requests through to test if the downstream service has recovered before fully closing the circuit', 'To shut down the microservice container gracefully', 'To flush application logs to disk'],
                        correct: 1,
                        explanation: 'In HALF_OPEN, the circuit breaker allows a small trial volume of requests through. If they succeed, it returns to CLOSED; if they fail, it trips back to OPEN.'
                    },
                    {
                        question: '12. What algorithm is commonly used by Spring Cloud Gateway and Redis (RequestRateLimiter) to enforce API rate limits?',
                        options: ['Token Bucket (Leaky Bucket variant)', 'Bubble Sort', 'Dijkstra shortest path algorithm', 'Fast Fourier Transform'],
                        correct: 0,
                        explanation: 'Spring Cloud Gateway uses the Token Bucket algorithm via Redis Lua scripts, configuring continuous token replenishment rates and burst capacities.'
                    },
                    {
                        question: '13. What is the role of OpenTelemetry Collector in enterprise distributed observability?',
                        options: ['It replaces all relational databases', 'It provides a vendor-agnostic proxy to receive, process, batch, filter, and export telemetry data (metrics, logs, traces) to backends like Jaeger or Prometheus', 'It automatically compiles Java bytecode to machine code', 'It executes circuit breaker fallbacks'],
                        correct: 1,
                        explanation: 'The OpenTelemetry Collector acts as an observability data pipeline, receiving spans/metrics from applications, enriching or sampling them, and exporting to storage backends.'
                    },
                    {
                        question: '14. What occurs when a Resilience4j fallback method signature does NOT include the triggering exception as its final parameter?',
                        options: ['The fallback executes normally', 'Resilience4j fails to bind the fallback method at runtime, throwing a NoSuchMethodException or failing to intercept the failure', 'The application fails to compile', 'The exception is ignored silently'],
                        correct: 1,
                        explanation: 'Resilience4j matches fallback methods by parameter types matching the original method plus an extra trailing Throwable (or specific subclass) argument.'
                    },
                    {
                        question: '15. How does the Semaphore Bulkhead differ from the ThreadPool Bulkhead in Resilience4j?',
                        options: ['Semaphore Bulkhead uses separate threads; ThreadPool Bulkhead uses integers', 'Semaphore Bulkhead limits concurrent executions on the current calling thread without thread context switching; ThreadPool Bulkhead uses an isolated bounded queue and thread pool', 'Semaphore Bulkhead only works on Linux', 'ThreadPool Bulkheaead uses an isolated bounded queue and thread pool', 'Semaphore Bulkhead only works on Linux', 'ThreadPool Bulkhead does not support fallbacks'],
                        correct: 1,
                        explanation: 'A Semaphore bulkhead uses atomic counters to limit concurrent execution within the existing caller thread, avoiding the context-switching overhead of a dedicated thread pool.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-spring-security-oauth2',
            title: 'Week 9: Enterprise Security — Spring Security 6, OAuth2 & JWT Resource Servers',
            topics: [
                {
                    name: 'SecurityFilterChain Architecture: DelegatingFilterProxy & SecurityContextHolder',
                    definition: 'Spring Security intercepts incoming HTTP servlet traffic via a chain of ordered filters managed by DelegatingFilterProxy and FilterChainProxy, establishing identity contexts inside thread-local storage.',
                    concept: 'Standard Servlet filters run outside the Spring IoC container. To bridge this, Spring injects a standard servlet filter called DelegatingFilterProxy, which delegates request intercepting to FilterChainProxy (the @Bean("springSecurityFilterChain")). This proxy coordinates multiple SecurityFilterChain instances matched by URL patterns. During execution, authentication tokens are validated and stored in SecurityContextHolder via ThreadLocal strategy. Downstream authorization interceptors (AuthorizationFilter) evaluate permissions before allowing execution to reach @RestController endpoints.',
                    syntax: '// Spring Security 6 functional SecurityFilterChain declaration\n@Configuration\n@EnableWebSecurity\n@EnableMethodSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(AbstractHttpConfigurer::disable)\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/v1/auth/*", "/actuator/health").permitAll()\n                .requestMatchers("/api/v1/admin/*").hasRole("ADMIN")\n                .anyRequest().authenticated()\n            )\n            .build();\n    }\n}',
                    example: 'import org.springframework.security.core.context.SecurityContextHolder;\nimport org.springframework.security.authentication.UsernamePasswordAuthenticationToken;\nimport org.springframework.security.core.authority.SimpleGrantedAuthority;\nimport java.util.List;\n\npublic class SecurityContextManualSetup {\n    public static void main(String[] args) {\n        // Manual security context establishment (e.g., inside custom JWT Filter)\n        var authorities = List.of(new SimpleGrantedAuthority("ROLE_ENGINEER"));\n        var auth = new UsernamePasswordAuthenticationToken("anjani_dev", null, authorities);\n        \n        var context = SecurityContextHolder.createEmptyContext();\n        context.setAuthentication(auth);\n        SecurityContextHolder.setContext(context);\n\n        // Downstream lookup\n        var principal = SecurityContextHolder.getContext().getAuthentication();\n        System.out.println("Authenticated User: " + principal.getName());\n        System.out.println("Granted Authority: " + principal.getAuthorities());\n        \n        SecurityContextHolder.clearContext(); // Always clear in finally block\n    }\n}',
                    output: 'Authenticated User: anjani_dev\nGranted Authority: [ROLE_ENGINEER]',
                    keyPoints: [
                        'Always clear SecurityContext via SecurityContextHolder.clearContext() when manually managing threads to prevent thread-local leakage in pooled environments.',
                        'Spring Security 6 deprecates WebSecurityConfigurerAdapter entirely; configuration uses component-based @Bean declarations returning SecurityFilterChain.',
                        'Stateless REST APIs must configure SessionCreationPolicy.STATELESS to prevent the container from generating unwanted JSESSIONID cookies.'
                    ],
                    mistakes: [
                        'Using SecurityContextHolder.getContext().setAuthentication(auth) without first initializing a new empty context via SecurityContextHolder.createEmptyContext(), causing race conditions across threads.',
                        'Neglecting to secure actuator endpoints or relying solely on URL-based matching without reinforcing service layers using @PreAuthorize("hasAuthority(\'SCOPE_write\')").'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Custom Per-Request Tenant Authentication Filter',
                            desc: 'Write an OncePerRequestFilter that inspects an incoming X-Tenant-ID header, validates it against a tenant registry, and establishes tenant context inside a custom security principal.'
                        }
                    ]
                },
                {
                    name: 'OAuth2 Resource Servers: JWT Signature Verification & Nimbus JWK Sets',
                    definition: 'An OAuth2 Resource Server validates stateless JSON Web Tokens (JWTs) using asymmetric cryptographic signatures (RSA/ECDSA) retrieved dynamically from authorization server JWK Set endpoints.',
                    concept: 'In distributed architectures (Keycloak, Auth0, Okta), services act as stateless Resource Servers. Instead of introspecting tokens via remote network calls for each request, the resource server fetches the public key set via the JSON Web Key Set (jwks-uri) endpoint. The JwtDecoder verifies the signature using the corresponding key (kid), validates temporal claims (exp, nbf, iat), ensures the audience (aud) and issuer (iss) match expectations, and maps JWT claims (such as roles or scope) into Spring GrantedAuthority objects.',
                    syntax: '# application.yml OAuth2 Resource Server\nspring:\n  security:\n    oauth2:\n      resourceserver:\n        jwt:\n          issuer-uri: https://auth.company.internal/realms/enterprise\n          jwk-set-uri: https://auth.company.internal/realms/enterprise/protocol/openid-connect/certs\n          audiences: api://payment-gateway',
                    example: 'import org.springframework.core.convert.converter.Converter;\nimport org.springframework.security.core.GrantedAuthority;\nimport org.springframework.security.core.authority.SimpleGrantedAuthority;\nimport org.springframework.security.oauth2.jwt.Jwt;\nimport org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;\nimport java.util.*;\nimport java.util.stream.Collectors;\n\npublic class KeycloakRealmRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {\n    @Override\n    public Collection<GrantedAuthority> convert(Jwt jwt) {\n        Map<String, Object> realmAccess = jwt.getClaim("realm_access");\n        if (realmAccess == null || realmAccess.isEmpty()) return Collections.emptyList();\n        \n        @SuppressWarnings("unchecked")\n        List<String> roles = (List<String>) realmAccess.get("roles");\n        return roles.stream()\n            .map(roleName -> new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()))\n            .collect(Collectors.toList());\n    }\n}',
                    output: '// Converts Keycloak payload claim:\n// "realm_access": { "roles": ["admin"] } -> GrantedAuthority("ROLE_ADMIN")',
                    keyPoints: [
                        'Asymmetric JWT validation (RS256) relies solely on the issuer\'s public key, enabling offline signature verification without hitting the auth database.',
                        'JWKS clients automatically cache public keys in memory and refresh keys upon discovering unknown Key ID (kid) values during key rotation.',
                        'JwtAuthenticationConverter maps custom identity provider claim schemas into standard Spring GrantedAuthority representations.'
                    ],
                    mistakes: [
                        'Hardcoding symmetric HMAC secrets inside application code for microservices instead of using asymmetric public/private keys with JWKS.',
                        'Failing to validate the aud (audience) claim, allowing valid tokens issued for unrelated downstream internal services to authenticate against protected financial endpoints.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Method-Level RBAC with Custom Claim Parsing',
                            desc: 'Configure an OAuth2 Resource Server with a custom JwtAuthenticationConverter that extracts nested permission strings and verify method protection using @PreAuthorize("hasAuthority(\'PAYMENTS_CAPTURE\')").'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 9 Assessment: Filter Chains, SecurityContext, OAuth2 & JWT Verification',
                questions: [
                    {
                        question: '1. What bridge component links the standard Servlet container filter lifecycle to Spring-managed SecurityFilterChain beans?',
                        options: ['DispatcherServlet', 'DelegatingFilterProxy', 'HandlerInterceptor', 'ContextLoaderListener'],
                        correct: 1,
                        explanation: 'DelegatingFilterProxy is a standard javax/jakarta servlet filter registered in the web container that delegates all actual filtering work to the Spring-managed FilterChainProxy bean.'
                    },
                    {
                        question: '2. Where does Spring Security store the active Authentication principal by default in a synchronous Servlet application?',
                        options: ['Inside an application-scoped singleton bean', 'In a ThreadLocal variable encapsulated by SecurityContextHolder', 'Inside the HTTP response header', 'Persisted to a local SQLite database'],
                        correct: 1,
                        explanation: 'By default, SecurityContextHolder utilizes a ThreadLocal strategy (MODE_THREADLOCAL) to bind security context information to the currently executing thread.'
                    },
                    {
                        question: '3. What risk arises when using pooled threads (e.g., Tomcat worker pool) if SecurityContextHolder.clearContext() is not invoked after manual thread operations?',
                        options: ['Memory corruption in the OS kernel', 'Security Context Leakage: the next request assigned to that reused worker thread might inherit the previous user\'s authenticated identity', 'CPU frequency throttling', 'The JVM throws an OutOfMemoryError'],
                        correct: 1,
                        explanation: 'Because servlet containers reuse pooled worker threads across different client HTTP requests, failing to clear thread locals can cause identity bleeding across requests.'
                    },
                    {
                        question: '4. Why should stateless REST APIs disable CSRF protection via http.csrf(AbstractHttpConfigurer::disable)?',
                        options: ['CSRF tokens do not work with JSON requests', 'Stateless APIs do not store sessions in cookies and rely on Bearer tokens in Authorization headers, which browsers do not automatically attach cross-origin', 'CSRF is deprecated in HTTP/2', 'Disabling CSRF accelerates database queries'],
                        correct: 1,
                        explanation: 'Cross-Site Request Forgery exploits automatic browser cookie transmission; APIs authenticated via non-cookie Bearer tokens are inherently immune to classic CSRF attacks.'
                    },
                    {
                        question: '5. What endpoint on an OpenID Connect (OIDC) identity provider provides the public cryptographic keys used by Resource Servers to verify JWT signatures?',
                        options: ['/oauth/token', 'The JWKS (JSON Web Key Set) URI endpoint (e.g. /.well-known/jwks.json)', '/oauth/authorize', '/userinfo'],
                        correct: 1,
                        explanation: 'The JWKS endpoint publishes the authorization server\'s public keys (RSA/EC) formatted as JSON, allowing resource servers to fetch and verify signatures independently.'
                    },
                    {
                        question: '6. What does the kid (Key ID) header parameter inside a JWT header represent?',
                        options: ['The user\'s customer identification number', 'An identifier indicating which specific public key in the JWK Set was used to sign the token, enabling seamless key rotation', 'The unique transaction timestamp', 'The network socket port number'],
                        correct: 1,
                        explanation: 'The kid header allows the resource server to locate the exact matching public key from the JWKS cache when an authorization server rotates its signing keys.'
                    },
                    {
                        question: '7. What is the effect of configuring SessionCreationPolicy.STATELESS in Spring Security?',
                        options: ['Spring Security will neither create an HttpSession nor use an existing one to obtain the SecurityContext', 'The application runs exclusively in read-only mode', 'Cookies are completely blocked at the TCP level', 'All incoming requests are denied'],
                        correct: 0,
                        explanation: 'STATELESS ensures that Spring Security never creates or queries an HttpSession for authentication state, enforcing per-request credential validation.'
                    },
                    {
                        question: '8. How does @EnableMethodSecurity improve upon the legacy @EnableGlobalMethodSecurity annotation in Spring Security 6?',
                        options: ['It disables URL security', 'It activates modern JSR-250 and pre/post method authorization (@PreAuthorize) with cleaner defaults and SpEL evaluation via MethodSecurityInterceptor', 'It converts methods into reactive streams', 'It restricts method execution to single-thread pools'],
                        correct: 1,
                        explanation: '@EnableMethodSecurity is the modern Spring Security 6 annotation enabling method-level authorization (such as @PreAuthorize and @PostAuthorize) using updated authorization managers.'
                    },
                    {
                        question: '9. What claim inside a standard JWT defines the intended recipients that are allowed to accept the token?',
                        options: ['iss (Issuer)', 'aud (Audience)', 'sub (Subject)', 'exp (Expiration)'],
                        correct: 1,
                        explanation: 'The aud (audience) claim identifies the target services or APIs for which the token was issued. Resource servers should reject tokens that omit their identifier.'
                    },
                    {
                        question: '10. What does the hasRole("ADMIN") expression expect regarding internal role authority prefixing in Spring Security?',
                        options: ['It checks for the exact authority name "ADMIN"', 'It automatically prepends the prefix ROLE_, looking for a granted authority named ROLE_ADMIN', 'It checks if the username matches "ADMIN"', 'It decrypts the user password'],
                        correct: 1,
                        explanation: 'hasRole("XYZ") automatically checks for ROLE_XYZ in the user\'s authorities. In contrast, hasAuthority("XYZ") checks for the literal, un-prefixed string "XYZ".'
                    },
                    {
                        question: '11. Which filter in the default Spring Security filter chain is responsible for intercepting and parsing HTTP Bearer tokens in an OAuth2 Resource Server?',
                        options: ['BasicAuthenticationFilter', 'BearerTokenAuthenticationFilter', 'UsernamePasswordAuthenticationFilter', 'AnonymousAuthenticationFilter'],
                        correct: 1,
                        explanation: 'BearerTokenAuthenticationFilter extracts the Bearer token from the Authorization header and delegates verification to the configured AuthenticationManager / JwtDecoder.'
                    },
                    {
                        question: '12. What is the security consequence of accepting symmetric encryption (HS256) for microservice token verification across multiple independent teams?',
                        options: ['Tokens cannot contain JSON payloads', 'Every service verifying the token must share the identical secret key, meaning any compromised service can forge valid tokens for all other services', 'Tokens expire after 1 millisecond', 'HS256 requires 64-bit hardware architecture'],
                        correct: 1,
                        explanation: 'Symmetric signing requires all parties to share the private secret. In contrast, asymmetric algorithms (RS256) allow resource servers to hold only the public key.'
                    },
                    {
                        question: '13. What happens if a JWT contains an expiration timestamp (exp) that is slightly in the past due to minor clock differences between servers?',
                        options: ['The token is accepted forever', 'By default, Spring Security applies a small configurable clock skew threshold (typically 60 seconds) to accommodate minor NTP drifts', 'The database drops the connection', 'The server shuts down'],
                        correct: 1,
                        explanation: 'OAuth2TokenValidator implementations include a configurable clock skew window (default 60s) to prevent false-positive rejections caused by minor server time drift.'
                    },
                    {
                        question: '14. What does the @PostAuthorize("returnObject.owner == authentication.name") annotation do?',
                        options: ['Executes authorization checks before entering the method', 'Allows the method to execute fully, but evaluates the returned object against the SpEL expression before returning the response, throwing AccessDeniedException if false', 'Saves the return object into a database table', 'Replaces the return object with null'],
                        correct: 1,
                        explanation: '@PostAuthorize executes after the method body finishes, evaluating authorization rules against returnObject before sending the result back to the caller.'
                    },
                    {
                        question: '15. How should public unauthenticated endpoints (like health checks or login URLs) be configured in Spring Security 6?',
                        options: ['By omitting the SecurityFilterChain bean entirely', 'Using .requestMatchers("/public/**").permitAll() within the active SecurityFilterChain definition', 'By disabling the web server firewall', 'By writing a custom servlet filter that throws 404'],
                        correct: 1,
                        explanation: 'requestMatchers(...).permitAll() marks specific URL paths as publicly accessible while maintaining the active filter chain for the rest of the application.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-performance-gc-jmh',
            title: 'Week 10: Performance Optimization — Low-Latency GC, JIT & JMH Benchmarking',
            topics: [
                {
                    name: 'Garbage Collector Internals: G1, ZGC (Generational) & Shenandoah',
                    definition: 'Modern JVM garbage collectors eliminate traditional Stop-the-World (STW) latency spikes by performing marking, relocation, and pointer reference updating concurrently alongside active application mutator threads.',
                    concept: 'The Garbage-First (G1) collector partitions the heap into equal-sized virtual regions, prioritizing regions with the highest volume of reclaimable garbage while bounding pause times via -XX:MaxGCPauseMillis. For ultra-low latency requirements (sub-millisecond pauses on multi-terabyte heaps), ZGC (Z Garbage Collector) and Shenandoah utilize load barriers and colored pointers (or Brooks pointers). Generational ZGC separates young and old objects without long pauses: when an application mutator dereferences an unevacuated object, the CPU load barrier traps the pointer access, copies the object to the target region on the fly (self-healing), and updates the reference address without stalling the caller.',
                    syntax: '# JVM GC configuration flags\n# High-throughput balanced collector (Default)\njava -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -Xms8g -Xmx8g -jar app.jar\n\n# Ultra-low latency generational ZGC (Java 21+)\njava -XX:+UseZGC -XX:+ZGenerational -Xms16g -Xmx16g -jar app.jar',
                    example: 'import java.lang.management.GarbageCollectorMXBean;\nimport java.lang.management.ManagementFactory;\nimport java.util.List;\n\npublic class GCInspector {\n    public static void main(String[] args) {\n        List<GarbageCollectorMXBean> gcBeans = ManagementFactory.getGarbageCollectorMXBeans();\n        for (GarbageCollectorMXBean gc : gcBeans) {\n            System.out.println("Collector: " + gc.getName());\n            System.out.println("Collection Count: " + gc.getCollectionCount());\n            System.out.println("Accumulated Time (ms): " + gc.getCollectionTime());\n            System.out.println("Memory Pools: " + java.util.Arrays.toString(gc.getMemoryPoolNames()));\n            System.out.println("--------------------------------------------");\n        }\n    }\n}',
                    output: 'Collector: G1 Young Generation\nCollection Count: 14\nAccumulated Time (ms): 42\nMemory Pools: [G1 Eden Space, G1 Survivor Space]\n--------------------------------------------',
                    keyPoints: [
                        'G1 balances pause times and overall throughput by evacuating regions with the lowest survival ratios first.',
                        'Generational ZGC achieves consistent sub-millisecond pauses across massive heap sizes (up to 16TB) using colored pointers and load barriers.',
                        'Always match -Xms (initial heap) with -Xmx (max heap) in production to avoid OS memory re-allocation pauses during execution.'
                    ],
                    mistakes: [
                        'Setting -XX:MaxGCPauseMillis to an unrealistically low target (e.g. 5ms on G1), which forces frequent young GC cycles, lowers throughput, and triggers promotion failures.',
                        'Triggering explicit garbage collection via System.gc() in production code, causing full Stop-the-World pauses unless disabled with -XX:+DisableExplicitGC.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'GC Pause Log Analysis with Unified Logging',
                            desc: 'Enable -Xlog:gc*,gc+phases=debug:file=gc.log:time,uptime,pid:filecount=5,filesize=100M and parse the output to identify pause phases versus concurrent phases.'
                        }
                    ]
                },
                {
                    name: 'JMH Microbenchmarking & JIT Compiler Optimization (Tiered Compilation & Escape Analysis)',
                    definition: 'The Java HotSpot VM applies Tiered Compilation (C1 Client and C2 Server compilers) to profile runtime bytecode and compile hot execution paths directly into optimized native assembly instructions.',
                    concept: 'Writing microbenchmarks in standard Java code produces inaccurate results due to warm-up latency, Dead Code Elimination (DCE), and constant folding. The Java Microbenchmark Harness (JMH) prevents compiler dead-code elimination using Blackhole consumers and controls warm-up iterations. Under Tiered Compilation (Level 0 through Level 4), HotSpot profiles method invocation counters. C2 performs aggressive inlining, loop unrolling, and Escape Analysis: if an object allocation does not escape the allocating method scope, the compiler eliminates the heap allocation entirely and maps fields into CPU registers or stack memory (Scalar Replacement).',
                    syntax: '// Declarative JMH benchmark harness\n@BenchmarkMode(Mode.Throughput)\n@OutputTimeUnit(TimeUnit.MILLISECONDS)\n@State(Scope.Thread)\n@Warmup(iterations = 3, time = 1)\n@Measurement(iterations = 5, time = 1)\n@Fork(2)\npublic class HashBenchmark {\n    @Benchmark\n    public void testHash(Blackhole bh) {\n        bh.consume(computeHash("sample-payload"));\n    }\n}',
                    example: 'import org.openjdk.jmh.annotations.*;\nimport org.openjdk.jmh.infra.Blackhole;\nimport java.util.concurrent.TimeUnit;\n\n@State(Scope.Benchmark)\n@BenchmarkMode(Mode.AverageTime)\n@OutputTimeUnit(TimeUnit.NANOSECONDS)\npublic class EscapeAnalysisDemo {\n    record Coordinate(int x, int y) {}\n\n    @Benchmark\n    public void testNonEscapingAllocation(Blackhole bh) {\n        // Escape Analysis performs Scalar Replacement: object allocation on heap is eliminated\n        Coordinate coord = new Coordinate(42, 84);\n        int distanceSquared = coord.x() * coord.x() + coord.y() * coord.y();\n        bh.consume(distanceSquared);\n    }\n}',
                    output: '# JMH execution summary (sample):\n# Benchmark                                Mode  Cnt  Score   Error  Units\n# EscapeAnalysisDemo.testNonEscapingAlloc  avgt   10  1.821 ± 0.042  ns/op',
                    keyPoints: [
                        'Always consume benchmark return values using a JMH Blackhole or return them directly; otherwise, the C2 compiler will optimize away the unused code.',
                        'Escape Analysis identifies objects confined to a single method and applies Scalar Replacement, avoiding heap allocation and garbage collection entirely.',
                        'Tiered Compilation transitions code from Level 0 (Interpreter) through Levels 1-3 (C1 compiler with profiling) to Level 4 (C2 fully optimized native machine code).'
                    ],
                    mistakes: [
                        'Using naive System.currentTimeMillis() or System.nanoTime() loops to benchmark method performance, missing JIT warmup, deoptimization, and OS thread scheduling artifacts.',
                        'Writing benchmarks with constant loop inputs that trigger Constant Folding, misleadingly benchmarking zero operations instead of real logic.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Scalar Replacement Verification with PrintCompilation',
                            desc: 'Write a JMH benchmark for a non-escaping object allocation, run it with -XX:+PrintCompilation -XX:+UnlockDiagnosticVMOptions -XX:+PrintEscapeAnalysis, and verify that scalar replacement is active.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 10 Assessment: GC Algorithms, Low-Latency Tuning & JIT Compilation',
                questions: [
                    {
                        question: '1. What architectural approach allows ZGC and Shenandoah to deliver sub-millisecond maximum pause times on terabyte-scale heaps?',
                        options: ['They disable object allocation entirely', 'They perform object marking, relocation, and pointer reference updating concurrently with running application threads using load barriers', 'They execute exclusively on GPUs', 'They write garbage objects to temporary swap disks'],
                        correct: 1,
                        explanation: 'ZGC and Shenandoah use memory load barriers (and colored pointers) to evacuate objects and update reference pointers concurrently while application threads continue processing.'
                    },
                    {
                        question: '2. What is the role of a "Load Barrier" in the Z Garbage Collector (ZGC)?',
                        options: ['It balances network requests to database shards', 'It intercepts object reference lookups from the heap; if the target object is in an unevacuated region, it relocates it immediately and self-heals the pointer', 'It protects the heap from unauthorized access', 'It compiles bytecode into machine instructions'],
                        correct: 1,
                        explanation: 'A load barrier intercepts references read from the heap. If the pointer has not yet been updated to the relocated object address, the barrier moves the object, updates the pointer (self-healing), and returns the new address.'
                    },
                    {
                        question: '3. Why is it recommended in production enterprise deployments to set -Xms equal to -Xmx?',
                        options: ['To bypass Java license checks', 'To prevent JVM pause overhead and memory fragmentation caused by dynamically requesting heap memory allocations from the OS during traffic spikes', 'To enforce 32-bit pointer compression', 'To disable Metaspace'],
                        correct: 1,
                        explanation: 'Setting -Xms equal to -Xmx pre-allocates the entire heap at process startup, eliminating dynamic memory allocation requests and heap resizing pauses under load.'
                    },
                    {
                        question: '4. What is "Scalar Replacement" performed by HotSpot Escape Analysis during C2 compilation?',
                        options: ['Converting 64-bit integers to 32-bit floats', 'Deconstructing an object that does not escape method scope into its primitive constituent fields, mapping them to registers or stack frames instead of allocating on the heap', 'Replacing arrays with linked lists', 'Replacing methods with static functions'],
                        correct: 1,
                        explanation: 'If Escape Analysis proves an object never escapes the method boundary, the compiler avoids heap allocation and maps the object\'s individual fields to CPU registers or stack memory.'
                    },
                    {
                        question: '5. What happens during JMH benchmarking if a test method computes a value but neither returns it nor passes it to a Blackhole?',
                        options: ['JMH throws an assertion error', 'Dead Code Elimination (DCE): the C2 optimizing compiler detects the computation has no side effects and removes it entirely from the native code', 'The benchmark runs infinitely', 'Memory leaks crash the JVM'],
                        correct: 1,
                        explanation: 'Optimizing compilers eliminate operations whose results are never read or observed; JMH Blackhole instances ensure values are read so the computation is actually executed.'
                    },
                    {
                        question: '6. What does the JVM flag -XX:+DisableExplicitGC accomplish?',
                        options: ['Stops all garbage collection entirely', 'Ignores explicit programmatic invocations of System.gc(), preventing external code or libraries from triggering full Stop-the-World pauses', 'Enables ZGC automatically', 'Deletes all objects in Tenured generation'],
                        correct: 1,
                        explanation: 'Libraries or legacy code occasionally call System.gc(), triggering an expensive full STW collection; -XX:+DisableExplicitGC turns those calls into no-ops.'
                    },
                    {
                        question: '7. What is "Constant Folding" in JIT compiler optimization?',
                        options: ['Compressing text strings in memory', 'Simplifying constant expressions at compile time (e.g. replacing 24 * 60 * 60 with 86400) rather than computing them at runtime', 'Grouping class variables together', 'Converting loops to recursive calls'],
                        correct: 1,
                        explanation: 'Constant folding evaluates expressions involving known compile-time constants during compilation, replacing operations with their final precomputed values.'
                    },
                    {
                        question: '8. How does the G1 Garbage Collector choose which heap regions to collect during a mixed collection cycle?',
                        options: ['It collects regions in random order', 'It selects regions containing the highest proportion of dead objects (garbage) first to maximize reclaimed memory for the target pause time', 'It collects the oldest regions first regardless of garbage density', 'It collects only Eden regions'],
                        correct: 1,
                        explanation: 'G1 ("Garbage-First") models pause times and collects regions containing the most garbage first to yield the highest memory return within the configured pause target.'
                    },
                    {
                        question: '9. What are the two primary JIT compilers used in HotSpot\'s Tiered Compilation model?',
                        options: ['GCC and Clang', 'C1 (Client compiler focusing on rapid startup and basic optimization) and C2 (Server compiler performing aggressive global optimizations)', 'LLVM and Graal', 'Jikes and ByteBuddy'],
                        correct: 1,
                        explanation: 'Tiered compilation pairs C1 for fast startup with profiling instrumentation, escalating hot code to C2 for advanced optimizations like loop unrolling and inlining.'
                    },
                    {
                        question: '10. What does the @Warmup annotation specify in a JMH microbenchmark?',
                        options: ['Increases CPU clock frequency before testing', 'Executes preliminary iterations to trigger JIT compilation and tier advancement before actual measurement scores are recorded', 'Pre-allocates database connections', 'Verifies unit tests before benchmarking'],
                        correct: 1,
                        explanation: 'Warm-up iterations allow the JVM to profile code, trigger JIT compilation (Level 1-4), and stabilize branch prediction before capturing benchmark metrics.'
                    },
                    {
                        question: '11. What is Compressed Oops (-XX:+UseCompressedOops) in 64-bit JVM runtimes?',
                        options: ['Zip compression of logs', 'Representing 64-bit memory addresses as 32-bit shifted offsets on heaps under 32GB, reducing object header overhead and saving cache footprint', 'A crash recovery handler', 'Compressing String byte arrays'],
                        correct: 1,
                        explanation: 'Compressed Ordinary Object Pointers (Oops) scale 32-bit integers by 8-byte alignment, allowing 64-bit JVMs with heaps under 32GB to store pointers in 4 bytes instead of 8.'
                    },
                    {
                        question: '12. What causes "Deoptimization" in the HotSpot C2 compiler?',
                        options: ['Running out of disk space', 'An optimistic compiler assumption is invalidated at runtime (such as a polymorphic class loading that invalidates a monomorphic call site assumption)', 'CPU overheating', 'Heap usage exceeding 50%'],
                        correct: 1,
                        explanation: 'When runtime conditions violate speculative optimizations (e.g. a new subclass is loaded that invalidates monomorphic inlining), C2 bails out and falls back to interpreted execution.'
                    },
                    {
                        question: '13. What is the fundamental difference between G1 and Generational ZGC in terms of heap sizing and pause times?',
                        options: ['G1 is faster than ZGC on every configuration', 'G1 pause times scale with the volume of live surviving data; ZGC pauses remain consistently under 1ms regardless of whether the heap is 10GB or 10TB', 'ZGC only supports up to 1GB heaps', 'ZGC requires Stop-the-World pauses for marking'],
                        correct: 1,
                        explanation: 'Because ZGC performs relocation and pointer remapping concurrently using load barriers, pause times stay under a millisecond regardless of total heap size.'
                    },
                    {
                        question: '14. What does the unified JVM GC logging tag -Xlog:gc* output to log files?',
                        options: ['Java source code syntax errors', 'Detailed runtime events for garbage collection cycles, pause durations, memory reclamation stats, and concurrent phase timings', 'Thread stack traces for every method call', 'HTTP access logs'],
                        correct: 1,
                        explanation: 'The Unified JVM GC Logging framework (-Xlog:gc*) records detailed GC event logs, pause durations, memory transitions, and phase diagnostics.'
                    },
                    {
                        question: '15. Why should microbenchmarks avoid sharing mutable state across threads without proper JMH scope configurations?',
                        options: ['Java does not allow threads in benchmarks', 'Uncoordinated shared state causes hardware cache-line bouncing, false sharing, and lock contention that skew benchmark timing', 'It causes the benchmark runner to skip iterations', 'JMH disables multi-threading'],
                        correct: 1,
                        explanation: 'Contended mutable state across threads introduces synchronization pauses and CPU cache invalidations, benchmarking memory contention rather than the target algorithm.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-reactive-webflux-r2dbc',
            title: 'Week 11: Reactive Programming — Project Reactor, WebFlux & Non-Blocking R2DBC',
            topics: [
                {
                    name: 'Reactive Streams Specification: Mono, Flux, Backpressure & Schedulers',
                    definition: 'The Reactive Streams specification defines a standard for asynchronous, non-blocking stream processing with non-blocking backpressure across the JVM.',
                    concept: 'Traditional blocking models tie execution to OS threads. Project Reactor implements the four core Reactive Streams interfaces: Publisher, Subscriber, Subscription, and Processor. A Mono<T> emits 0 or 1 item, while a Flux<T> emits 0 to N items. Streams are lazy—nothing happens until .subscribe() is invoked. Backpressure enables a consumer to signal demand (Subscription.request(n)), preventing fast producers from overwhelming slow consumers. Execution threading is controlled via Schedulers: Schedulers.boundedElastic() offloads blocking legacy I/O, while Schedulers.parallel() handles CPU-bound processing on fixed EventLoop threads.',
                    syntax: '// Declarative Project Reactor stream with backpressure buffer\nFlux<OrderEvent>\n    .fromIterable(orderBatches)\n    .filter(OrderEvent::isApproved)\n    .onBackpressureBuffer(1000, BufferOverflowStrategy.DROP_OLDEST)\n    .publishOn(Schedulers.boundedElastic())\n    .flatMap(orderProcessor::persistOrderAsync, 16);',
                    example: 'import reactor.core.publisher.Flux;\nimport reactor.core.scheduler.Schedulers;\nimport java.util.List;\n\npublic class ReactorStreamDemo {\n    public static void main(String[] args) throws InterruptedException {\n        List<String> symbols = List.of("AAPL", "GOOGL", "MSFT", "AMZN");\n\n        Flux.fromIterable(symbols)\n            .map(String::toLowerCase)\n            .publishOn(Schedulers.parallel())\n            .map(sym -> "[" + Thread.currentThread().getName().substring(0, 8) + "] " + sym)\n            .collectList()\n            .subscribe(results -> results.forEach(System.out::println));\n\n        Thread.sleep(100); // Allow parallel scheduler to emit\n    }\n}',
                    output: '[parallel] aapl\n[parallel] googl\n[parallel] msft\n[parallel] amzn',
                    keyPoints: [
                        'Reactive streams are lazy: no computation, network dispatch, or database queries run until a terminal subscription occurs.',
                        'publishOn() switches downstream execution to the designated Scheduler, while subscribeOn() dictates upstream source generation thread context.',
                        'Backpressure protects memory by allowing the subscriber to govern producer emissions via pull-based demand signaling (request(n)).'
                    ],
                    mistakes: [
                        'Calling .block() or .blockFirst() inside WebFlux filters or Netty EventLoop threads, which stalls the non-blocking execution thread and can freeze the runtime.',
                        'Subscribing multiple times to a "cold" publisher that executes side-effects (e.g., HTTP POST), resulting in duplicate downstream service invocations.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Resilient Custom Backpressure Subscriber',
                            desc: 'Implement a custom BaseSubscriber<T> that requests items in batches of 10, processing them asynchronously and requesting the next batch only after completion.'
                        }
                    ]
                },
                {
                    name: 'Full-Stack Non-Blocking: Spring WebFlux & R2DBC Relational Access',
                    definition: 'Spring WebFlux provides an asynchronous, event-driven web framework running on Netty, while R2DBC delivers reactive, non-blocking drivers for relational SQL databases.',
                    concept: 'Traditional Spring MVC relies on the Servlet API where each HTTP connection consumes a dedicated thread from a bounded pool (e.g., Tomcat 200 threads). Spring WebFlux runs on Netty with an EventLoop architecture where a handful of threads handle thousands of concurrent requests. Standard JDBC is inherently blocking at the socket level; R2DBC (Reactive Relational Database Connectivity) introduces non-blocking database drivers for Postgres, MySQL, and SQL Server, allowing the entire pipeline—from ingress HTTP socket to database wire protocol—to run without blocking a single OS thread.',
                    syntax: '// Spring Data R2DBC reactive repository\npublic interface TradeRepository extends ReactiveCrudRepository<Trade, Long> {\n    @Query("SELECT * FROM trades WHERE account_id = :accountId AND status = :status")\n    Flux<Trade> findActiveTrades(String accountId, String status);\n}\n\n// Functional RouterFunction endpoint\n@Bean\npublic RouterFunction<ServerResponse> routes(TradeHandler handler) {\n    return route(GET("/api/v2/trades/{id}"), handler::getTradeById)\n        .andRoute(GET("/api/v2/trades/stream"), handler::streamLiveTrades);\n}',
                    example: 'import org.springframework.web.reactive.function.server.*;\nimport reactor.core.publisher.Mono;\n\npublic class FunctionalEndpointDemo {\n    public static class EchoHandler {\n        public Mono<ServerResponse> handleEcho(ServerRequest request) {\n            return request.bodyToMono(String.class)\n                .map(String::toUpperCase)\n                .flatMap(echoed -> ServerResponse.ok()\n                    .header("X-Reactive-Engine", "Reactor-Netty")\n                    .bodyValue("Echo: " + echoed));\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println("RouterFunction defined and bound to Netty EventLoop without Servlet containers.");\n    }\n}',
                    output: 'RouterFunction defined and bound to Netty EventLoop without Servlet containers.',
                    keyPoints: [
                        'WebFlux endpoints return Mono<T> or Flux<T>; Netty streams responses back to clients using non-blocking chunked transfer encoding.',
                        'Server-Sent Events (SSE) stream continuous real-time updates over HTTP using text/event-stream media types with Flux.',
                        'R2DBC does not implement JPA/Hibernate ORM specs; it deliberately avoids lazy-loading and dirty-checking in favor of explicit reactive SQL execution.'
                    ],
                    mistakes: [
                        'Mixing standard blocking JDBC dependencies (HikariCP, standard JPA) inside a WebFlux service, which quietly exhausts bounded thread pools under production load.',
                        'Assuming WebFlux automatically makes single-request calculations faster; reactive pipelines introduce minor abstraction overhead and are optimized for concurrent throughput, not raw single-thread latency.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Real-Time SSE Stock Ticker with WebFlux',
                            desc: 'Build a WebFlux controller streaming periodic price update objects over Server-Sent Events (MediaType.TEXT_EVENT_STREAM_VALUE) using Flux.interval.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 11 Assessment: Project Reactor, Backpressure, WebFlux & R2DBC',
                questions: [
                    {
                        question: '1. What core problem does Backpressure resolve in the Reactive Streams specification?',
                        options: ['It balances CPU thermal loads', 'It allows a downstream subscriber to signal its capacity to the upstream publisher, preventing fast data producers from overwhelming slow consumers and causing OOM errors', 'It encrypts network payloads', 'It retries database deadlocks'],
                        correct: 1,
                        explanation: 'Backpressure provides feedback flow control (Subscription.request(n)), ensuring publishers do not emit items faster than consumers can buffer and process them.'
                    },
                    {
                        question: '2. What is the cardinality difference between a Project Reactor Mono<T> and a Flux<T>?',
                        options: ['Mono emits 0 or 1 item; Flux emits an asynchronous sequence of 0 to N items', 'Mono only emits errors; Flux only emits successes', 'Mono handles multi-threading; Flux runs single-threaded', 'Mono is synchronous; Flux is asynchronous'],
                        correct: 0,
                        explanation: 'In Project Reactor, Mono<T> represents a deferred 0 or 1 value completion, while Flux<T> represents an asynchronous stream of 0 to N items.'
                    },
                    {
                        question: '3. What happens if you invoke .block() on a Mono inside a Spring WebFlux application running on Reactor Netty?',
                        options: ['The Mono converts into a CompletableFuture safely', 'It blocks the underlying Netty EventLoop thread, starving other concurrent connections and triggering an IllegalStateException: block()/blockFirst() are blocking', 'The database drops the query', 'The JVM terminates immediately'],
                        correct: 1,
                        explanation: 'Calling blocking methods on Netty EventLoop threads halts event processing for all connections mapped to that loop; Project Reactor detects this and throws an exception.'
                    },
                    {
                        question: '4. Why is traditional JPA/Hibernate incompatible with high-throughput reactive WebFlux architectures?',
                        options: ['JPA does not support SQL', 'JPA and standard JDBC drivers are inherently blocking at the I/O socket level, requiring dedicated threads per query and nullifying non-blocking event-loop benefits', 'JPA requires XML files', 'JPA only works with MySQL'],
                        correct: 1,
                        explanation: 'Standard JDBC drivers block the caller thread during network socket I/O, breaking the reactive contract and requiring R2DBC non-blocking drivers instead.'
                    },
                    {
                        question: '5. What is the fundamental difference between publishOn() and subscribeOn() in a Project Reactor stream pipeline?',
                        options: ['publishOn changes thread context for downstream operators; subscribeOn dictates the thread context where the upstream source subscription begins', 'publishOn writes to disk; subscribeOn reads from disk', 'subscribeOn only works on Flux; publishOn only works on Mono', 'They are exact synonyms'],
                        correct: 0,
                        explanation: 'subscribeOn influences where the source publisher generates items, whereas publishOn switches execution context for all subsequent downstream pipeline operators.'
                    },
                    {
                        question: '6. Which Project Reactor Scheduler is designated for offloading unavoidable legacy blocking I/O calls (e.g., legacy files, blocking HTTP)?',
                        options: ['Schedulers.immediate()', 'Schedulers.parallel()', 'Schedulers.boundedElastic()', 'Schedulers.single()'],
                        correct: 2,
                        explanation: 'Schedulers.boundedElastic() creates a dynamically sized, bounded worker thread pool explicitly designed for offloading blocking tasks without starving core EventLoops.'
                    },
                    {
                        question: '7. What does the term "Cold Publisher" signify in reactive programming?',
                        options: ['A publisher that runs on refrigerated hardware', 'A publisher that generates data afresh for each new subscriber, initiating execution only after .subscribe() is called', 'A publisher that is pre-compiled to C++', 'A publisher that discards old records'],
                        correct: 1,
                        explanation: 'Cold publishers generate a dedicated timeline of events for each subscriber upon subscription (e.g., database queries or HTTP calls), whereas Hot publishers emit regardless of subscribers.'
                    },
                    {
                        question: '8. How does Spring WebFlux stream continuous real-time data to web browsers without polling?',
                        options: ['By using Server-Sent Events (SSE) with MediaType.TEXT_EVENT_STREAM_VALUE over a persistent HTTP connection', 'By creating 1,000 parallel AJAX polling requests', 'By opening FTP channels', 'By downloading zip archives'],
                        correct: 0,
                        explanation: 'WebFlux natively streams continuous events using SSE (text/event-stream), pushing records from a Flux over a single long-lived HTTP connection.'
                    },
                    {
                        question: '9. What does the flatMap operator do when processing a reactive stream of items?',
                        options: ['Flattens 2D arrays into 1D lists synchronously', 'Transforms each element into an asynchronous Publisher, subscribes to them concurrently, and merges their emissions into a single flattened output stream', 'Discards duplicate entries', 'Sorts elements alphabetically'],
                        correct: 1,
                        explanation: 'flatMap maps each element to a new asynchronous publisher, flattens the resulting concurrent streams, and merges emitted items into a unified output.'
                    },
                    {
                        question: '10. What does the concatMap operator do differently compared to flatMap in Project Reactor?',
                        options: ['concatMap runs faster on GPUs', 'concatMap preserves source element ordering by subscribing to the next inner Publisher only after the previous inner Publisher has fully completed', 'concatMap only supports strings', 'concatMap drops late elements'],
                        correct: 1,
                        explanation: 'While flatMap merges inner publishers concurrently (potentially reordering items), concatMap processes inner publishers sequentially, preserving strict emission order.'
                    },
                    {
                        question: '11. Why does R2DBC omit ORM features like dirty checking, first-level caching, and lazy loading?',
                        options: ['R2DBC was designed before Java 8', 'Transparent lazy-loading and dirty checking require hidden synchronous interceptors that conflict with non-blocking, asynchronous reactive contracts', 'SQL databases prohibit caching', 'R2DBC only supports MongoDB'],
                        correct: 1,
                        explanation: 'Transparent lazy-loading relies on blocking interceptors when getters are called; R2DBC embraces explicit, non-blocking asynchronous SQL flows instead.'
                    },
                    {
                        question: '12. What happens if a reactive stream throws an unhandled exception inside a .map() transformation?',
                        options: ['The stream ignores the error and continues', 'The error drops into the terminal onError channel, immediately terminating the stream pipeline unless caught by an onErrorResume or onErrorReturn operator', 'The JVM crashes', 'The element is replaced with null'],
                        correct: 1,
                        explanation: 'In Reactive Streams, an unhandled exception terminates the sequence through the onError terminal notification, which cancels upstream subscriptions.'
                    },
                    {
                        question: '13. What is the role of StepVerifier in the reactor-test library?',
                        options: ['Tests database connection latencies', 'Provides a declarative testing harness to verify reactive streams step-by-step, asserting onNext emissions, backpressure requests, and terminal completions', 'Compiles reactive code into bytecode', 'Benchmarks thread pool performance'],
                        correct: 1,
                        explanation: 'StepVerifier subscribes to a Publisher and validates its emissions, expectations, and terminal signals (expectNext(), verifyComplete()) in unit tests.'
                    },
                    {
                        question: '14. What is a "Hot Publisher" in Project Reactor (e.g., Sinks.Many)?',
                        options: ['A publisher that runs only on high-temperature CPU nodes', 'A publisher that produces data independently of whether any subscribers are currently listening, broadcasting emissions to all active subscribers', 'A publisher that deletes its source data', 'A publisher that does not support JSON'],
                        correct: 1,
                        explanation: 'Hot publishers generate events regardless of subscriptions; subscribers share the active stream and only receive events emitted after they subscribe.'
                    },
                    {
                        question: '15. What is the purpose of the WebClient component in Spring WebFlux compared to legacy RestTemplate?',
                        options: ['WebClient is a modern, non-blocking, reactive HTTP client that supports asynchronous streaming and backpressure with lower resource utilization', 'WebClient only works with HTML pages', 'WebClient is synchronous only', 'RestTemplate is faster on multi-core systems'],
                        correct: 0,
                        explanation: 'WebClient replaced RestTemplate as Spring\'s recommended HTTP client, providing non-blocking, reactive request-response and streaming capabilities.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-distributed-transactions-sagas',
            title: 'Week 12: Distributed Transactions, Sagas & Eventual Consistency Patterns',
            topics: [
                {
                    name: 'The Fallacy of Distributed ACID: Two-Phase Commit (2PC) vs The Saga Pattern',
                    definition: 'Distributed systems abandon traditional ACID transactions (Two-Phase Commit / XA) due to blocking coordinator bottlenecks, adopting the Saga pattern to achieve eventual consistency across microservice boundaries.',
                    concept: 'Two-Phase Commit (2PC) enforces strict atomicity across multiple databases using Prepare and Commit phases via an XA transaction manager. However, 2PC is synchronous and blocking: if the coordinator fails or a network partition occurs while resources hold locks, database connections remain frozen, degrading availability and violating the CAP theorem. The Saga pattern breaks a global business transaction into a sequence of local transactions. Each local transaction updates its local database and publishes an event or message. If a step fails, the Saga executes compensating transactions backward to revert partial updates (semantic undo), ensuring eventual consistency without holding long-lived distributed locks.',
                    syntax: '// Saga Step Interface with forward execution and compensating rollback\npublic interface SagaStep<T> {\n    StepResult execute(T context);\n    void compensate(T context); // Reversible semantic compensation\n}',
                    example: 'public class SagaOrchestratorDemo {\n    record OrderContext(String orderId, double amount, boolean paymentFailed) {}\n\n    static class InventoryService {\n        public boolean reserveStock(String orderId) {\n            System.out.println("Step 1: Inventory reserved for order " + orderId);\n            return true;\n        }\n        public void releaseStock(String orderId) {\n            System.out.println("Compensating Step 1: Inventory released for order " + orderId);\n        }\n    }\n\n    static class PaymentService {\n        public boolean processPayment(String orderId, double amount, boolean fail) {\n            if (fail) {\n                System.out.println("Step 2 FAILED: Payment declined for order " + orderId);\n                return false;\n            }\n            System.out.println("Step 2: Payment captured for order " + orderId);\n            return true;\n        }\n    }\n\n    public static void main(String[] args) {\n        var inventory = new InventoryService();\n        var payment = new PaymentService();\n        var ctx = new OrderContext("ORD-9912", 240.00, true);\n\n        // Orchestrating transaction sequence\n        if (inventory.reserveStock(ctx.orderId())) {\n            boolean paymentOk = payment.processPayment(ctx.orderId(), ctx.amount(), ctx.paymentFailed());\n            if (!paymentOk) {\n                System.out.println("Saga failure detected. Executing compensating pipeline...");\n                inventory.releaseStock(ctx.orderId());\n            }\n        }\n    }\n}',
                    output: 'Step 1: Inventory reserved for order ORD-9912\nStep 2 FAILED: Payment declined for order ORD-9912\nSaga failure detected. Executing compensating pipeline...\nCompensating Step 1: Inventory released for order ORD-9912',
                    keyPoints: [
                        '2PC/XA holds database locks across network boundaries until all nodes vote, creating severe latency bottlenecks and availability risks.',
                        'Sagas trade isolation (I in ACID) for availability and scale; dirty reads can occur during the execution window prior to compensation.',
                        'Compensating transactions must be idempotent and must not fail; they undo semantic state rather than performing direct physical database rollbacks.'
                    ],
                    mistakes: [
                        'Assuming compensating transactions restore the exact prior state without accounting for intermediate external mutations that occurred concurrently.',
                        'Writing non-idempotent compensating handlers, causing corrupted balances or incorrect inventory counts when retried over transient networks.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Saga State Machine Engine',
                            desc: 'Design a resilient Saga Execution Coordinator (SEC) that records step transition logs in a local database to resume or compensate partially failed workflows across system crashes.'
                        }
                    ]
                },
                {
                    name: 'Choreography vs Orchestration & The Transactional Outbox Pattern',
                    definition: 'Sagas coordinate either through decentralized message listening (Choreography) or centralized command routing (Orchestration), relying on the Transactional Outbox pattern to eliminate dual-write hazards.',
                    concept: 'In Choreography, microservices publish domain events to a message bus (Kafka/RabbitMQ) and listen to peer events to trigger the next step. While decoupled, complex flows become difficult to trace and risk cyclic dependencies. In Orchestration, a dedicated orchestrator service sends explicit commands to participants and tracks workflow state, providing centralized visibility at the cost of higher coupling. Both approaches face the Dual-Write Problem: writing to a database and publishing a message cannot be atomically coupled without 2PC. The Transactional Outbox Pattern solves this by inserting the outgoing event into an outbox database table within the same local database transaction, where a Change Data Capture (CDC) engine (e.g., Debezium) streams it reliably to the message broker.',
                    syntax: '-- Relational Outbox Schema for atomic dual-write safety\nCREATE TABLE outbox_events (\n    id UUID PRIMARY KEY,\n    aggregate_type VARCHAR(64) NOT NULL,\n    aggregate_id VARCHAR(64) NOT NULL,\n    event_type VARCHAR(128) NOT NULL,\n    payload JSONB NOT NULL,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);',
                    example: 'import java.util.UUID;\n\npublic class TransactionalOutboxService {\n    record Order(String id, String customerId, double total) {}\n    record OutboxRecord(UUID eventId, String aggregateType, String aggregateId, String type, String payload) {}\n\n    public void placeOrder(Order order) {\n        // Simulating atomic local relational transaction\n        System.out.println("BEGIN TRANSACTION");\n        System.out.println("INSERT INTO orders (id, customer_id, total) VALUES (\'" + order.id() + "\', ...);");\n        \n        var event = new OutboxRecord(\n            UUID.randomUUID(),\n            "Order",\n            order.id(),\n            "OrderCreatedEvent",\n            "{\\"orderId\\":\\"" + order.id() + "\\", \\"total\\":" + order.total() + "}"\n        );\n        System.out.println("INSERT INTO outbox_events (id, aggregate_type, aggregate_id, event_type, payload) VALUES (...)");\n        System.out.println("COMMIT TRANSACTION");\n        System.out.println("-> Debezium CDC reads DB WAL and streams event to Kafka with zero data loss.");\n    }\n\n    public static void main(String[] args) {\n        var service = new TransactionalOutboxService();\n        service.placeOrder(new Order("ORD-881", "CUST-41", 89.50));\n    }\n}',
                    output: 'BEGIN TRANSACTION\nINSERT INTO orders (id, customer_id, total) VALUES (\'ORD-881\', ...);\nINSERT INTO outbox_events (id, aggregate_type, aggregate_id, event_type, payload) VALUES (...)\nCOMMIT TRANSACTION\n-> Debezium CDC reads DB WAL and streams event to Kafka with zero data loss.',
                    keyPoints: [
                        'Choreography is suitable for simple workflows with 2-4 steps; Orchestration is preferred for complex multi-party enterprise workflows requiring monitoring and audits.',
                        'The Dual-Write Problem occurs when an application writes to a database and emits a message to an event bus: failure between the two operations corrupts consistency.',
                        'Transactional Outbox guarantees at-least-once event publication by writing events into the local database transaction log and tailing the database WAL.'
                    ],
                    mistakes: [
                        'Publishing messages directly to Kafka inside a Spring @Transactional method before commit, leaking uncommitted events if the database transaction rolls back.',
                        'Using naive polling (SELECT * FROM outbox_events WHERE processed = false) under high transaction throughput instead of streaming log changes via WAL-based CDC.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Idempotent Consumer Deduplication Filter',
                            desc: 'Implement an idempotent message consumer using an in-memory or database unique message ID table that detects and drops duplicate events delivered by at-least-once brokers.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 12 Assessment: Distributed Transactions, Sagas, 2PC & Outbox Pattern',
                questions: [
                    {
                        question: '1. Why are traditional Two-Phase Commit (2PC / XA) transactions generally avoided in modern microservice architectures?',
                        options: ['They do not support relational SQL databases', 'They are synchronous and blocking: holding database locks across network boundaries until all nodes vote, which reduces throughput and creates single-point-of-failure bottlenecks', 'They only work on single-core CPUs', 'They corrupt file system permissions'],
                        correct: 1,
                        explanation: '2PC requires participants to hold resource locks during the prepare-and-commit window; network latency or participant crashes block connections, degrading availability.'
                    },
                    {
                        question: '2. What is the fundamental operational mechanism of the Saga Pattern in distributed systems?',
                        options: ['Using distributed shared memory across nodes', 'Splitting a business transaction into sequential local database transactions, executing compensating transactions to undo partial work if a step fails', 'Replicating all databases into a single central node', 'Converting all synchronous HTTP APIs into FTP file drops'],
                        correct: 1,
                        explanation: 'A Saga coordinates a chain of local database transactions; if any local transaction fails, the Saga runs compensating transactions in reverse order to semantically roll back changes.'
                    },
                    {
                        question: '3. What core ACID property is sacrificed by the Saga pattern during its active execution window?',
                        options: ['Atomicity', 'Isolation: intermediate, uncommitted updates from early steps are visible to other concurrent transactions before the entire Saga finishes or compensates', 'Durability', 'Consistency'],
                        correct: 1,
                        explanation: 'Because each Saga step commits locally to its database, other clients can observe intermediate states (lack of isolation) before downstream steps succeed or trigger compensations.'
                    },
                    {
                        question: '4. What constitutes a "Compensating Transaction" in a distributed Saga workflow?',
                        options: ['A transaction that pays financial damages to users', 'An explicit, idempotent forward action that semantically reverts the visible side-effects of a previously committed local transaction (e.g., releasing reserved inventory)', 'A transaction executed directly by the database engine rollback command', 'A query running in read-only mode'],
                        correct: 1,
                        explanation: 'Compensating transactions provide semantic rollback: because the prior step was already committed to the database, an explicit offsetting operation must be applied to undo its business effect.'
                    },
                    {
                        question: '5. What architectural challenge arises from using Choreography-based Sagas in large, multi-step business processes?',
                        options: ['It requires an expensive central orchestrator server', 'Decentralized event listening makes it difficult to track global workflow state, understand business flow paths, and detect cyclic event dependencies', 'Choreography cannot use message queues like Kafka', 'Services must share a single database table'],
                        correct: 1,
                        explanation: 'In Choreography, no central coordinator maintains the global picture; as steps proliferate, tracing end-to-end execution paths and reasoning about edge cases becomes difficult.'
                    },
                    {
                        question: '6. What does the "Dual-Write Problem" refer to in distributed backend engineering?',
                        options: ['Writing to two disks simultaneously for RAID backup', 'The impossibility of updating an internal database and publishing a message to an external broker atomically without distributed transactions, risking desynchronization if one step fails', 'Writing simultaneously to standard output and standard error', 'A race condition where two users update the same record'],
                        correct: 1,
                        explanation: 'If an application writes to a local database and sends a message to Kafka, a crash or network partition between those actions leaves the system in an inconsistent state.'
                    },
                    {
                        question: '7. How does the Transactional Outbox Pattern resolve the Dual-Write Problem?',
                        options: ['By disabling message brokers completely', 'By inserting outgoing events into an outbox table within the same local database transaction as the business entity update, then streaming them to the message broker via CDC', 'By sending the Kafka message first, then rolling it back via HTTP if the DB fails', 'By executing database writes inside a Redis cache'],
                        correct: 1,
                        explanation: 'Saving the event to an outbox table in the same local relational transaction guarantees atomicity; Change Data Capture (CDC) or a background worker then publishes it reliably.'
                    },
                    {
                        question: '8. What is the role of Change Data Capture (CDC) tools like Debezium in the Transactional Outbox Pattern?',
                        options: ['They compile Java bytecode to machine code', 'They tail the database transaction write-ahead log (WAL) to extract newly committed outbox table records and publish them to Kafka without polling overhead', 'They act as reverse proxies for incoming HTTP traffic', 'They validate user passwords'],
                        correct: 1,
                        explanation: 'Debezium reads the database transaction log directly (Postgres WAL / MySQL binlog), ensuring that every committed outbox record is captured and streamed to Kafka with minimal overhead.'
                    },
                    {
                        question: '9. Why must compensating transactions in a distributed Saga be designed to be strictly idempotent?',
                        options: ['To allow them to run on single-threaded CPUs', 'Because network timeouts or retry mechanisms can invoke the compensating action multiple times; it must produce the identical business state without duplicate reversals', 'Because non-idempotent methods run slower in Java', 'To allow them to bypass Spring Security'],
                        correct: 1,
                        explanation: 'In distributed environments, transient network failures trigger retries; if a compensation method (e.g., refund or restock) is called twice, it must not execute duplicate adjustments.'
                    },
                    {
                        question: '10. What is a Saga Execution Coordinator (SEC) in an Orchestrated Saga architecture?',
                        options: ['An operating system scheduler', 'A centralized service or state machine engine that persists workflow progression state, dispatches step commands to services, and triggers compensations upon failure', 'A database connection pool', 'A hardware load balancer'],
                        correct: 1,
                        explanation: 'The SEC maintains the workflow state machine, invoking participant services sequentially and executing compensating commands if any service reports failure.'
                    },
                    {
                        question: '11. What is the role of an Idempotency Key in distributed API operations?',
                        options: ['An encryption key for SSL certificates', 'A unique client-generated request identifier that servers use to recognize duplicate submissions and return original cached responses without re-executing logic', 'A database primary key used only for user passwords', 'A token for JWT expiration'],
                        correct: 1,
                        explanation: 'Clients pass an idempotency key (e.g., in a header); the server tracks processed keys, safely ignoring duplicate retries of identical operations.'
                    },
                    {
                        question: '12. What is a "Pivot Transaction" in the taxonomy of Saga steps?',
                        options: ['The first transaction in the workflow', 'The point of no return: once the pivot transaction commits successfully, the Saga can no longer be compensated and must complete all subsequent steps forward', 'A transaction that switches database drivers', 'A transaction that executes in memory only'],
                        correct: 1,
                        explanation: 'Saga steps before the pivot can be compensated; once the pivot transaction commits, compensation is no longer possible and remaining steps are guaranteed to proceed to completion.'
                    },
                    {
                        question: '13. What problem occurs if an application publishes a Kafka message from within a Spring @Transactional block before the transaction commits?',
                        options: ['The Kafka broker throws an OutOfMemoryError', 'Premature message visibility: consumers process the message before the database commit finishes; if the DB transaction subsequently rolls back, downstream systems have acted on phantom data', 'The Spring IoC container shuts down', 'The database connection leaks'],
                        correct: 1,
                        explanation: 'Publishing messages before database commit creates race conditions: downstream consumers may read uncommitted data, or process events for transactions that ultimately abort.'
                    },
                    {
                        question: '14. What is a "Semantic Lock" countermeasure in Saga designs to mitigate lack of isolation?',
                        options: ['A database-level row lock held for 24 hours', 'An application-level flag or status indicator (e.g., ORDER_PENDING_APPROVAL) that signals to other transactions that the entity is undergoing an active, unfinalized Saga', 'A synchronized block on the JVM thread', 'A hardware lock on the server chassis'],
                        correct: 1,
                        explanation: 'Because database locks are released between Saga steps, application-level flags (e.g., PENDING) indicate an in-flight workflow, preventing conflicting updates.'
                    },
                    {
                        question: '15. Which consistency model is guaranteed by the Saga pattern across participating distributed databases?',
                        options: ['Strict Immediate Linearizability', 'Eventual Consistency: all participating databases converge to a consistent state once the Saga steps or compensations fully complete', 'Sequential Consistency with zero read anomalies', 'Single-copy serializability'],
                        correct: 1,
                        explanation: 'Sagas achieve eventual consistency: individual services commit transactions incrementally, converging to a globally synchronized state once all forward steps or rollbacks finish.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-cloud-native-containers-k8s',
            title: 'Week 13: Cloud-Native Java — Container Layering, Kubernetes & Cloud Deployments',
            topics: [
                {
                    name: 'JVM Container Ergonomics & Optimized Multi-Stage Layering (Jib / Buildpacks)',
                    definition: 'Containerizing Java applications requires tuning JVM container ergonomics, cgroup awareness, and multi-stage image layering to minimize deployment payloads and maximize build caching.',
                    concept: 'Legacy Java runtimes were container-unaware, reading physical host hardware memory and CPU counts instead of container cgroup resource limits, which triggered abrupt OOMKills (Exit Code 137) by the Linux kernel. Modern JVMs (Java 17/21) natively respect cgroup v1/v2 boundaries via -XX:+UseContainerSupport and calculate default heap limits based on -XX:MaxRAMPercentage (typically 75-80%). Packaging applications using naive fat JAR COPY directives invalidates Docker build caches on every minor code edit. Multi-stage Docker layering separates dependencies (dependencies/), Spring Boot loader components (spring-boot-loader/), internal snapshot dependencies (snapshot-dependencies/), and application classes (application/), ensuring fast layer reuse. Google Jib and Cloud Native Buildpacks (Paketo) streamline this by compiling container images directly from Maven/Gradle without requiring local Docker daemons.',
                    syntax: '# Multi-stage layered Spring Boot Dockerfile\nFROM eclipse-temurin:21-jre-alpine AS builder\nWORKDIR /builder\nARG JAR_FILE=target/*.jar\nCOPY ${JAR_FILE} application.jar\nRUN java -Djarmode=layertools -jar application.jar extract\n\nFROM eclipse-temurin:21-jre-alpine\nWORKDIR /application\n# Copy layers in order of change frequency (least frequent to most frequent)\nCOPY --from=builder /builder/dependencies/ ./\nCOPY --from=builder /builder/spring-boot-loader/ ./\nCOPY --from=builder /builder/snapshot-dependencies/ ./\nCOPY --from=builder /builder/application/ ./\nENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "org.springframework.boot.loader.launch.JarLauncher"]',
                    example: 'public class ContainerRuntimeInspection {\n    public static void main(String[] args) {\n        Runtime rt = Runtime.getRuntime();\n        long maxMemMb = rt.maxMemory() / (1024 * 1024);\n        int availableCores = rt.availableProcessors();\n        \n        System.out.println("JVM Max Memory Allocated: " + maxMemMb + " MB");\n        System.out.println("JVM Detected Available CPU Cores: " + availableCores);\n        System.out.println("Container Ergonomics Active: " + System.getProperty("java.vm.name"));\n    }\n}',
                    output: 'JVM Max Memory Allocated: 1536 MB\nJVM Detected Available CPU Cores: 2\nContainer Ergonomics Active: OpenJDK 64-Bit Server VM',
                    keyPoints: [
                        'Always configure -XX:MaxRAMPercentage=75.0 (or 80.0) in containers to leave headroom for non-heap native memory (Metaspace, thread stacks, JIT compilation, OS buffers).',
                        'java -Djarmode=layertools -jar app.jar extract decomposes fat JARs into cached image layers, drastically speeding up CI/CD pushes.',
                        'Avoid running Java processes as root inside containers; use unprivileged non-root users (USER 10001:10001) to comply with enterprise container security policies.'
                    ],
                    mistakes: [
                        'Setting -Xmx to 100% of the container memory limit, resulting in sudden Linux kernel OOMKiller process terminations when Metaspace and thread stacks allocate native memory.',
                        'Using raw fat JAR copies in Dockerfiles (COPY target/app.jar app.jar), which forces the entire 80MB+ artifact to be re-uploaded across container registries for a 1-line code change.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Non-Root Multi-Stage Layering Build',
                            desc: 'Write an alpine-based multi-stage Dockerfile that extracts Spring Boot layertools, provisions an unprivileged user group, and sets optimal container memory percentages.'
                        }
                    ]
                },
                {
                    name: 'Kubernetes Pod Lifecycle: Probes (Liveness/Readiness/Startup) & Graceful Shutdown',
                    definition: 'Kubernetes orchestrates container health through Startup, Readiness, and Liveness probes, coordinating with Spring Boot graceful shutdown to drain in-flight requests without dropping traffic.',
                    concept: 'Kubernetes relies on three distinct probe types to manage pod states: Startup Probes protect slow-starting applications by pausing other probe evaluations; Liveness Probes detect unrecoverable deadlocks and restart containers; Readiness Probes ensure traffic is routed to the pod only when it is fully prepared to handle requests. In Spring Boot 3, Actuator natively integrates with Kubernetes via HealthContributor groups: /actuator/health/liveness and /actuator/health/readiness. During a Pod termination lifecycle (SIGTERM), Kubernetes removes the pod IP from Endpoint slices while the application runs its Graceful Shutdown lifecycle (server.shutdown=graceful), allowing active HTTP connections to complete within a bounded grace period before hard termination (SIGKILL).',
                    syntax: '# Kubernetes deployment probes configuration\nspec:\n  containers:\n    - name: order-service\n      image: registry.internal/order-service:1.2.0\n      ports:\n        - containerPort: 8080\n      startupProbe:\n        httpGet:\n          path: /actuator/health/liveness\n          port: 8080\n        failureThreshold: 20\n        periodSeconds: 5\n      readinessProbe:\n        httpGet:\n          path: /actuator/health/readiness\n          port: 8080\n        periodSeconds: 10\n      livenessProbe:\n        httpGet:\n          path: /actuator/health/liveness\n          port: 8080\n        periodSeconds: 15',
                    example: 'import org.springframework.boot.availability.AvailabilityChangeEvent;\nimport org.springframework.boot.availability.ReadinessState;\nimport org.springframework.context.ApplicationEventPublisher;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class CustomReadinessManager {\n    private final ApplicationEventPublisher eventPublisher;\n\n    public CustomReadinessManager(ApplicationEventPublisher eventPublisher) {\n        this.eventPublisher = eventPublisher;\n    }\n\n    public void markTrafficSuspended(String reason) {\n        // Programmatically tell Kubernetes Readiness Probe to pull pod from Service endpoint routing\n        AvailabilityChangeEvent.publish(eventPublisher, this, ReadinessState.REFUSING_TRAFFIC);\n        System.out.println("Readiness state set to REFUSING_TRAFFIC: " + reason);\n    }\n}',
                    output: '// Log entry on event publication:\n// Readiness state set to REFUSING_TRAFFIC: Maintenance Warmup',
                    keyPoints: [
                        'Startup probes protect slow JVM cold starts from being prematurely killed by eager Liveness probes.',
                        'Readiness failure stops ingress traffic without killing the pod; Liveness failure forces container termination and restart.',
                        'server.shutdown=graceful combined with spring.lifecycle.timeout-per-shutdown-phase=30s ensures in-flight HTTP connections finish cleanly before container exit.'
                    ],
                    mistakes: [
                        'Pointing the Liveness probe to an external database or downstream microservice check, causing widespread cascading pod restart loops if the database experiences a brief network blip.',
                        'Failing to configure a preStop hook sleep (sleep 5) or graceful shutdown, causing client requests that arrive while iptables routes update to drop abruptly with connection reset errors.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Graceful Drainage and PreStop Hook Pipeline',
                            desc: 'Configure a Kubernetes deployment spec with a preStop sleep hook and Spring graceful shutdown properties, verifying zero HTTP 502/503 dropped requests during a rolling deployment.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 13 Assessment: Cloud-Native Java, Containers, Ergonomics & Kubernetes Lifecycle',
                questions: [
                    {
                        question: '1. What happened to legacy Java runtimes (prior to cgroup awareness) when deployed into Docker containers with constrained memory limits?',
                        options: ['The JVM adjusted its heap allocation dynamically', 'The JVM read total physical host machine RAM instead of the container cgroup limit, over-allocating heap and triggering an OS kernel OOMKill (Exit Code 137)', 'The container refused to start', 'The JVM automatically enabled swap files'],
                        correct: 1,
                        explanation: 'Older JVMs queried the host OS directly, ignoring container memory limits and allocating heaps sized for the entire host, causing the Linux kernel to terminate the container with OOMKill.'
                    },
                    {
                        question: '2. Why should -XX:MaxRAMPercentage typically be configured between 70% and 80% rather than 100% inside containerized environments?',
                        options: ['To reserve CPU time slices for other processes', 'To reserve off-heap memory for the JVM Metaspace, thread stacks, JIT compilation caches, GC buffers, and OS process requirements', 'To prevent hard drive corruption', 'To run two JVM instances in the same container'],
                        correct: 1,
                        explanation: 'The JVM requires significant non-heap native memory (Metaspace, thread stacks, direct buffers, JIT compiler); setting heap to 100% of container limits guarantees an OOMKill.'
                    },
                    {
                        question: '3. What optimization does Spring Boot layertools (java -Djarmode=layertools -jar app.jar extract) provide for Docker container images?',
                        options: ['It minifies Java source files', 'It decomposes a monolithic fat JAR into distinct physical layers (dependencies, loader, snapshot-dependencies, application) so rarely changing library layers stay cached between builds', 'It removes all unused class files', 'It compiles Java code to native C binary'],
                        correct: 1,
                        explanation: 'Extracting layered directories allows Docker to cache the large dependencies layer, re-copying only the lightweight application layer when business code changes.'
                    },
                    {
                        question: '4. What is the fundamental difference between a Kubernetes Readiness Probe and a Liveness Probe?',
                        options: ['Readiness probes run on Linux; Liveness probes run on Windows', 'Readiness determines if the pod can accept client traffic (removing it from endpoints if failing); Liveness determines if the container is healthy or deadlocked (restarting it if failing)', 'Readiness probes kill the container; Liveness probes pause it', 'They are exact synonyms in Kubernetes'],
                        correct: 1,
                        explanation: 'Readiness probes control traffic routing (pulling unhealthy pods from service endpoints without killing them), while Liveness probes restart containers that have crashed or deadlocked.'
                    },
                    {
                        question: '5. What dangerous architectural failure happens if a Kubernetes Liveness Probe checks an external database connection?',
                        options: ['The database loses all tables', 'Cascading cluster restarts: if the database has a brief latency spike or restart, every single dependent microservice pod fails its liveness probe and restarts simultaneously', 'Kubernetes scales the cluster to zero', 'The pod switches to read-only mode'],
                        correct: 1,
                        explanation: 'Liveness probes must assess internal process health only. Tying liveness to external dependencies causes simultaneous cluster-wide restart storms during downstream outages.'
                    },
                    {
                        question: '6. What does the server.shutdown=graceful property configure in a Spring Boot application?',
                        options: ['Saves the heap dump to an S3 bucket', 'Instructs the embedded web server (Tomcat/Netty) to stop accepting new HTTP connections upon SIGTERM while allowing existing in-flight requests to complete within a grace timeout', 'Instantly cuts power to the web container', 'Rolls back all committed database rows'],
                        correct: 1,
                        explanation: 'Graceful shutdown stops receiving new incoming requests and allows active in-flight requests to process to completion before the container process exits.'
                    },
                    {
                        question: '7. What is the purpose of a Kubernetes Startup Probe for Java enterprise applications?',
                        options: ['Starts the Kubernetes cluster nodes', 'Disables Liveness and Readiness probes until the slow JVM process completes class loading and initialization, preventing premature container restarts during cold start', 'Initializes the database schema', 'Runs compile-time integration tests'],
                        correct: 1,
                        explanation: 'Startup probes give cold JVM processes ample time to start up without triggering aggressive liveness probe timeouts and premature termination loops.'
                    },
                    {
                        question: '8. How does Google Jib create container images without needing a local Docker daemon installed?',
                        options: ['It uses an online compiler website', 'It organizes build outputs into OCI/Docker container layer specs and pushes them directly to remote registries using Java network sockets', 'It runs Docker inside a virtual machine', 'It converts JAR files into ISO files'],
                        correct: 1,
                        explanation: 'Jib constructs compliant Docker/OCI image manifests and layers directly in Java and streams them straight to container registries without requiring a local Docker daemon or root privileges.'
                    },
                    {
                        question: '9. What does Exit Code 137 indicate when inspecting a terminated container in Kubernetes (kubectl describe pod)?',
                        options: ['Application threw an uncaught NullPointerException', 'The container process was forcefully killed by the OS kernel using SIGKILL (signal 9: 128 + 9 = 137) because it exceeded its cgroup memory limit (OOMKilled)', 'Network port collision', 'Invalid SSL certificate'],
                        correct: 1,
                        explanation: 'Exit code 137 indicates the container received SIGKILL (128 + 9), almost universally triggered by the Linux kernel Out-Of-Memory (OOM) killer enforcing memory limits.'
                    },
                    {
                        question: '10. Why is a preStop sleep hook (exec: command: ["/bin/sh", "-c", "sleep 5"]) often configured in Kubernetes Pod specs before stopping Java apps?',
                        options: ['To let the server cool down physically', 'To provide time for Kubernetes iptables / kube-proxy to synchronize endpoint removal across all cluster nodes before the pod process stops handling traffic', 'To wait for the next cron job', 'To flush garbage collection memory to disk'],
                        correct: 1,
                        explanation: 'Because endpoint updates propagate asynchronously across cluster nodes, adding a brief preStop sleep ensures the pod continues accepting requests while routing tables remove its IP.'
                    },
                    {
                        question: '11. Which Actuator endpoint health group exposes the specialized readiness check for Kubernetes in Spring Boot 3?',
                        options: ['/actuator/health/metrics', '/actuator/health/readiness', '/actuator/health/ping', '/actuator/health/disk'],
                        correct: 1,
                        explanation: 'Spring Boot exposes the /actuator/health/readiness endpoint specifically calibrated for Kubernetes readiness probes, returning UP or OUT_OF_SERVICE.'
                    },
                    {
                        question: '12. What does -XX:ActiveProcessorCount=n configure when passed as a JVM startup argument inside a container?',
                        options: ['Forces the JVM to burn CPU power continuously', 'Explicitly overrides the number of available CPU cores detected by the JVM for thread pool sizing (ForkJoinPool, GC worker threads, Netty event loops)', 'Disables multi-threading', 'Sets the clock speed of the CPU'],
                        correct: 1,
                        explanation: '-XX:ActiveProcessorCount overrides the detected CPU core count, ensuring internal pools (ForkJoinPool, GC threads, Netty loops) scale properly under fractional cgroup limits.'
                    },
                    {
                        question: '13. What security principle is violated by running Java microservice containers as the default root user?',
                        options: ['Principle of Least Privilege: container breakouts or vulnerabilities could allow attackers to gain root access to the underlying host node system', 'Single Responsibility Principle', 'Open-Closed Principle', 'Stateless Design Principle'],
                        correct: 0,
                        explanation: 'Running as an unprivileged user limits an attacker\'s capabilities on both the container file system and host OS in the event of a container breakout.'
                    },
                    {
                        question: '14. What happens when Spring Boot publishes an AvailabilityChangeEvent with ReadinessState.REFUSING_TRAFFIC?',
                        options: ['The JVM terminates immediately', 'The /actuator/health/readiness endpoint returns HTTP 503 (OUT_OF_SERVICE), prompting the Kubernetes service controller to remove the pod from routing endpoints', 'All open database transactions are committed', 'The container restarts automatically'],
                        correct: 1,
                        explanation: 'Transitioning to REFUSING_TRAFFIC sets the readiness probe to unhealthy, causing Kubernetes to stop routing new ingress requests to this specific pod instance.'
                    },
                    {
                        question: '15. What tool allows building minimal native Linux executables of Spring Boot applications for container deployment without any JVM runtime installed in the target image?',
                        options: ['GraalVM Native Image compilation with AOT', 'Standard Maven compile plugin', 'Eclipse JGit', 'Apache Ant'],
                        correct: 0,
                        explanation: 'GraalVM Native Image compiles Spring Boot apps ahead-of-time into standalone OS machine binaries that run without requiring an installed JVM runtime.'
                    }
                ]
            }
        },
        {
            id: 'sec-java-enterprise-capstone',
            title: 'Week 14: Enterprise Capstone — High-Scale System Design & Production Architecture',
            topics: [
                {
                    name: 'Enterprise System Architecture: Multi-Region Active-Active & CQRS Event Sourcing',
                    definition: 'Enterprise Java systems scale to millions of requests per second by separating write and read workloads via Command Query Responsibility Segregation (CQRS) and persisting state as an append-only sequence of immutable domain events.',
                    concept: 'Traditional CRUD architectures encounter write contention on normalized database tables under heavy concurrent load. CQRS separates write mutations (Commands handled by transactional domain aggregates) from high-throughput read operations (Queries served by read-optimized denormalized projections in Elasticsearch or Redis). When paired with Event Sourcing (Axon Framework or custom Kafka/Postgres event stores), business entities do not overwrite their state; instead, state is derived by replaying past events. In multi-region deployments, conflict-free replicated data types (CRDTs) and partition-aware routing ensure low-latency localized writes while synchronizing cross-region read replicas asynchronously.',
                    syntax: '// CQRS Command Aggregate Root with Event Sourcing\npublic class AccountAggregate {\n    private String accountId;\n    private long balanceCents;\n    \n    public void handle(CreditAccountCommand cmd) {\n        if (cmd.amountCents() <= 0) throw new IllegalArgumentException("Invalid amount");\n        // Apply and persist immutable domain event\n        apply(new AccountCreditedEvent(cmd.accountId(), cmd.amountCents(), Instant.now()));\n    }\n    \n    public void on(AccountCreditedEvent event) {\n        this.balanceCents += event.amountCents();\n    }\n}',
                    example: 'import java.util.*;\nimport java.time.Instant;\n\npublic class EventSourcingReplayDemo {\n    public sealed interface DomainEvent permits Deposited, Withdrawn {}\n    public record Deposited(long amountCents, Instant timestamp) implements DomainEvent {}\n    public record Withdrawn(long amountCents, Instant timestamp) implements DomainEvent {}\n\n    public static class BankAccount {\n        private long balanceCents = 0;\n\n        public void replay(List<DomainEvent> eventHistory) {\n            for (DomainEvent event : eventHistory) {\n                switch (event) {\n                    case Deposited(long amt, var ts) -> this.balanceCents += amt;\n                    case Withdrawn(long amt, var ts) -> this.balanceCents -= amt;\n                }\n            }\n        }\n        public long getBalanceCents() { return balanceCents; }\n    }\n\n    public static void main(String[] args) {\n        var history = List.of(\n            new Deposited(50000, Instant.now()),\n            new Withdrawn(15000, Instant.now()),\n            new Deposited(20000, Instant.now())\n        );\n\n        var account = new BankAccount();\n        account.replay(history);\n        System.out.println("Reconstituted Account Balance: $" + (account.getBalanceCents() / 100.0));\n    }\n}',
                    output: 'Reconstituted Account Balance: $550.0',
                    keyPoints: [
                        'Event Sourcing preserves a complete, tamper-evident historical audit log; past state at any arbitrary point in time can be reconstituted by replaying events up to that timestamp.',
                        'CQRS eliminates database locking between reads and writes by serving read queries from denormalized views updated asynchronously via domain events.',
                        'Snapshots prevent replaying millions of historical events on frequently mutated aggregates by saving periodic state checkpoints.'
                    ],
                    mistakes: [
                        'Applying CQRS and Event Sourcing to simple CRUD applications with minimal write concurrency, introducing substantial architectural complexity without business justification.',
                        'Failing to handle event schema evolution (upcasting), leading to serialization failures when older legacy event structures are replayed by newer application versions.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Event Store Replay and Snapshot Engine',
                            desc: 'Implement an event store that writes domain events to an append-only PostgreSQL table and reconstructs aggregate state using a snapshot cache to limit replayed events to a maximum of 50.'
                        }
                    ]
                },
                {
                    name: 'Production Resiliency & Senior Architecture Verification',
                    definition: 'Production verification combines Chaos Engineering, contract testing, structured disaster recovery drills, and strict SLA/SLO latency enforcement across distributed Java backends.',
                    concept: 'Before deploying distributed Java systems to production, systems must be hardened against real-world degradation. Chaos Engineering (Chaos Mesh, Gremlin) injects latency, network partitions, and pod kills to verify that Resilience4j circuit breakers, Kafka consumer group rebalances, and Kubernetes probes recover gracefully without manual intervention. Consumer-Driven Contract Testing (Pact, Spring Cloud Contract) verifies API compatibility across independent release pipelines without spinning up full end-to-end integration environments. Senior engineering governance establishes Service Level Objectives (SLOs) tied to Error Budgets, driving architectural decisions based on tail latency ($P_{99}$ and $P_{99.9}$) rather than simplistic averages.',
                    syntax: '// Spring Cloud Contract DSL specification (sample)\nContract.make {\n    description "should return 200 OK with valid account balance"\n    request {\n        method GET()\n        url "/api/v1/accounts/ACC-101"\n    }\n    response {\n        status OK()\n        headers { contentType(applicationJson()) }\n        body("""{"accountId": "ACC-101", "status": "ACTIVE", "balance": 550.00}""")\n    }\n}',
                    example: 'public class LatencyPercentileCalculator {\n    public static double computePercentile(long[] latenciesMs, double percentile) {\n        java.util.Arrays.sort(latenciesMs);\n        int index = (int) Math.ceil((percentile / 100.0) * latenciesMs.length) - 1;\n        return latenciesMs[Math.max(0, index)];\n    }\n\n    public static void main(String[] args) {\n        long[] latencies = {12, 14, 15, 16, 18, 19, 21, 22, 25, 450}; // 9 fast requests, 1 tail latency spike\n        System.out.println("Median Latency (P50): " + computePercentile(latencies, 50.0) + " ms");\n        System.out.println("Tail Latency (P90): " + computePercentile(latencies, 90.0) + " ms");\n        System.out.println("Extreme Tail (P99): " + computePercentile(latencies, 99.0) + " ms");\n    }\n}',
                    output: 'Median Latency (P50): 18.0 ms\nTail Latency (P90): 25.0 ms\nExtreme Tail (P99): 450.0 ms',
                    keyPoints: [
                        'Average latency hides tail latency spikes; production systems must track $P_{99}$ and $P_{99.9}$ percentiles to identify user-impacting performance degradation.',
                        'Consumer-Driven Contract Testing allows microservices to deploy independently with confidence that downstream API contracts remain unbroken.',
                        'Chaos Engineering proactively validates fault tolerance mechanisms (circuit breakers, fallbacks, auto-scaling) under controlled simulated failures.'
                    ],
                    mistakes: [
                        'Relying solely on end-to-end integration test environments in CI/CD pipelines, which are brittle, slow, and expensive to maintain compared to contract tests.',
                        'Focusing exclusively on mean latency metrics, remaining unaware that 1 out of every 100 customers ($P_{99}$) experiences severe multi-second timeouts.'
                    ],
                    practiceQuestions: [
                        {
                            title: 'Pact Contract Test Implementation',
                            desc: 'Write a consumer-driven Pact test in Spring Boot that mocks an upstream payment gateway response, generates a contract JSON file, and verifies provider compliance.'
                        }
                    ]
                }
            ],
            quiz: {
                title: 'Week 14 Assessment: Enterprise Architecture, CQRS, Event Sourcing & Resiliency',
                questions: [
                    {
                        question: '1. What is the fundamental principle of Command Query Responsibility Segregation (CQRS)?',
                        options: ['Writing all code in a single class file', 'Separating read and write operations into distinct data models, services, and schemas optimized specifically for their respective tasks', 'Using only NoSQL databases for all application needs', 'Encrypting every SQL query string'],
                        correct: 1,
                        explanation: 'CQRS separates command operations (writes that mutate state) from query operations (reads that fetch data), allowing each side to scale, model, and optimize independently.'
                    },
                    {
                        question: '2. How is current entity state determined in an Event-Sourced architecture?',
                        options: ['By querying a single mutable row in a relational database table', 'By sequentially replaying the append-only stream of immutable domain events that occurred for that aggregate from its inception to the present', 'By reading the latest heap dump file', 'By executing a full database re-indexing operation'],
                        correct: 1,
                        explanation: 'In Event Sourcing, state is never directly overwritten; the current state is reconstituted by applying the historical sequence of domain events to an empty aggregate.'
                    },
                    {
                        question: '3. What problem do "Snapshots" solve in long-lived Event-Sourced aggregates?',
                        options: ['They prevent database disk drives from filling up', 'They save periodic state checkpoints (e.g. every 100 events) so state reconstitution loads the snapshot first and only replays subsequent recent events, avoiding slow replays across thousands of records', 'They replace Java class files', 'They encrypt historical events'],
                        correct: 1,
                        explanation: 'As event streams grow, replaying thousands of events degrades read performance; snapshots provide state checkpoints to bound replay times.'
                    },
                    {
                        question: '4. Why are $P_{99}$ and $P_{99.9}$ percentile metrics more informative for enterprise SLAs than average (mean) latency?',
                        options: ['Percentiles are easier to compute in Java', 'Averages conceal severe tail-latency spikes experienced by a significant subset of users, whereas $P_{99}$ reveals the worst performance experienced by the top 1% of requests', 'Averages only work on integers', 'Percentiles ignore network latency'],
                        correct: 1,
                        explanation: 'Averages mask outliers. A system with a 20ms average may still have a 3,000ms $P_{99}$ tail latency, causing 1 out of 100 requests to suffer unacceptable timeouts.'
                    },
                    {
                        question: '5. What is the primary purpose of Consumer-Driven Contract Testing (e.g. Pact)?',
                        options: ['To verify database connection throughput', 'To enable services to independently verify that their API changes do not break downstream consumer expectations without needing complex end-to-end integration environments', 'To replace unit testing entirely', 'To generate SSL certificates dynamically'],
                        correct: 1,
                        explanation: 'Contract testing captures interface expectations between services as contracts, allowing providers and consumers to test independently in CI/CD without spinning up full multi-service clusters.'
                    },
                    {
                        question: '6. What does "Upcasting" refer to in Event Sourcing schema maintenance?',
                        options: ['Casting a 32-bit integer to a 64-bit long in Java bytecode', 'A transformation step that converts older, legacy domain event formats into updated schema versions on the fly when reading from the event store before aggregate replay', 'Promoting junior developers to senior roles', 'Migrating from relational databases to NoSQL'],
                        correct: 1,
                        explanation: 'Because historical events in an event store are immutable, upcasters transform legacy event payloads into newer format versions during read time to maintain backward compatibility.'
                    },
                    {
                        question: '7. What is the purpose of Chaos Engineering in enterprise distributed systems?',
                        options: ['Writing unstructured code without design patterns', 'Proactively injecting controlled real-world faults (e.g. network latency, killing pods, severing database connections) to verify that resilience mechanisms and fallbacks behave correctly', 'Randomly dropping database tables during peak hours', 'Disabling all monitoring systems'],
                        correct: 1,
                        explanation: 'Chaos Engineering intentionally induces simulated production failures to reveal architectural weaknesses and prove that self-healing and fallback mechanisms operate as expected.'
                    },
                    {
                        question: '8. How does CQRS handle eventual consistency when updating denormalized read views?',
                        options: ['By holding a global 2PC distributed lock on all databases', 'The write aggregate emits a domain event upon committing; projection handlers consume the event asynchronously and update read-optimized views (e.g. Elasticsearch/Redis)', 'By restarting the application server after each write', 'By reading directly from uncommitted transaction logs'],
                        correct: 1,
                        explanation: 'Commands commit locally and publish domain events; read-side projectors listen to these events asynchronously to update denormalized read models, achieving eventual consistency.'
                    },
                    {
                        question: '9. What is an Error Budget in Site Reliability Engineering (SRE)?',
                        options: ['The financial budget allocated to bug bounties', 'The allowable threshold of unreliability ($1.0 - \\text{SLO}$) that a service can accumulate over a time window before new feature deployments are halted in favor of stability engineering', 'The maximum number of exceptions allowed in log files', 'The cost of database hardware licensing'],
                        correct: 1,
                        explanation: 'An error budget defines the acceptable margin of failure (e.g. 0.1% downtime for a 99.9% SLO); exceeding it halts feature rollouts to focus development effort on reliability.'
                    },
                    {
                        question: '10. What is a Conflict-Free Replicated Data Type (CRDT) in active-active multi-region Java systems?',
                        options: ['A thread-safe array list in Java Collections', 'A data structure that can be concurrently replicated and updated across multiple independent regions without central coordination, resolving concurrent write conflicts mathematically', 'A database index without foreign keys', 'A compiled C++ library invoked via JNI'],
                        correct: 1,
                        explanation: 'CRDTs mathematically guarantee convergence across distributed replicas without requiring coordination or locking, making them ideal for multi-region active-active architectures.'
                    },
                    {
                        question: '11. Why is an append-only log inherently more performant for database writes than traditional random in-place updates?',
                        options: ['Append-only logs disable data compression', 'Sequential disk and SSD write operations are orders of magnitude faster than random I/O seek operations and avoid lock contention on updated rows', 'Append-only logs run in the CPU instruction cache', 'Append-only logs bypass operating system file systems'],
                        correct: 1,
                        explanation: 'Sequential writes avoid expensive random disk seeks and in-place row-level lock contention, enabling significantly higher write throughput.'
                    },
                    {
                        question: '12. What role does an Aggregate Root serve in Domain-Driven Design (DDD) within enterprise Java backends?',
                        options: ['The top-level root folder of the Maven project', 'The primary domain entity that encapsulates a cluster of associated objects and enforces all domain invariants and transactional consistency boundaries for that cluster', 'The database connection pool manager', 'The main entry method public static void main'],
                        correct: 1,
                        explanation: 'An Aggregate Root guards business rules and invariants; external code cannot mutate internal aggregate entities directly without going through the aggregate root.'
                    },
                    {
                        question: '13. What is a "Poison Pill" message in enterprise message-driven architectures (Kafka/RabbitMQ)?',
                        options: ['An encrypted message sent by administrative users', 'A corrupted or unparseable message that consistently crashes consumer processing loops upon delivery, triggering infinite retry loops unless routed to a Dead Letter Queue (DLQ)', 'A message that shuts down the broker cluster', 'A health check heartbeat packet'],
                        correct: 1,
                        explanation: 'Poison pills cause consumer exceptions on every attempt. Without dead-letter queuing or error handling, they stall partition consumption in endless retry cycles.'
                    },
                    {
                        question: '14. What occurs when a Dead Letter Queue (DLQ) is implemented in an enterprise messaging pipeline?',
                        options: ['Failed messages are permanently deleted immediately', 'Messages that exhaust all configured retry attempts are redirected to an isolated DLQ topic for alerting, forensic inspection, and manual re-driving without blocking mainstream processing', 'The message broker shuts down', 'The consumer offset is reset to zero'],
                        correct: 1,
                        explanation: 'A DLQ captures unprocessable messages so healthy traffic continues unimpeded, giving engineers an audit trail to debug and replay failed messages once fixed.'
                    },
                    {
                        question: '15. What architectural verification confirms that an enterprise microservice can survive an entire cloud availability zone (AZ) failure without dropping traffic?',
                        options: ['Running unit tests with 100% code coverage', 'Multi-AZ active-active deployment verification using automated failover testing, cross-AZ health checks, and redundant load balancing','Configuring Java heap to 64GB', 'Enabling HTTP/2 on the web server'],
                        correct: 1,
                        explanation: 'Surviving AZ outages requires multi-AZ active-active deployments with cross-zone load balancing, redundant data replication, and regular automated disaster recovery validation.'
                    }
                ]
            }
        }
        
    ]
};